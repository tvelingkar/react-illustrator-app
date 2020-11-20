#!/bin/bash
##-----------------------------------------------------------------------------------------------
## Script      - SAST
## Usage       - Perform static security analysis of application source code using AppScan on Cloud
## Date        - Aug-01-2020
## Author      - Biswajit Roy
## Alerts      - N/A
## Ver     Date     Person               Remarks
## 1.0   2020-08-01 Biswajit             None
##--------------------------------------------------------------------------------------------------
set +x
set -e

#Notify Slack
notify(){
    echo -e "$1"
    body="[${BUILD_ENGINE}: ${SAST_JOB_NAME}: ${BUILD_NUM}] ${1}"
    if [[ ${APPSCAN_SLACK_HOOK} && $1 ]]; then
        status=$(curl -s -X POST -H 'Content-type: application/json' --data '{"text":"'"$body"'"}' "$APPSCAN_SLACK_HOOK")
        echo "Slack notification: ${status}"
    fi
}

#Generate payload for scan report as PDF
generate_payload(){
cat <<EOF
{
    "Configuration": {
        "Summary": true,
        "Details": true,
        "Overview": true,
        "TableOfContent": true,
        "Advisories": true,
        "FixRecommendation": true,
        "History": true,
        "ReportFileType": "Pdf"
    },
    "OdataFilter": "(Status eq 'Open' or Status eq 'InProgress' or Status eq 'Reopened' or Status eq 'New')"
}
EOF
}

validate_parameters(){
    #Allow this script to be sourced only
    if [[ "$0" = "$BASH_SOURCE" ]]; then
        echo "Error: Script must be sourced"
        return 1
    fi

    #Validate required input variables
    if [[ -z $APPSCAN_TOKEN ]]; then
        echo "APPSCAN_TOKEN is not set"
        return 1
    elif [[  -z $APPSCAN_SECRET ]]; then
        echo "APPSCAN_SECRET is not set"
        return 1
    elif [[ -z $APPSCAN_APPNAME ]]; then
        echo "APPSCAN_APPNAME is not set"
        return 1
    fi

    #Validate optional Slack webhook URL
    if [[ ${APPSCAN_SLACK_HOOK} && ${APPSCAN_SLACK_HOOK} != https://hooks.slack.com/services/* ]]; then
        echo "Invalid slack webhook URL, please verify"
        return 1
    fi
}

set_variables(){
    #Set default behavior to wait for the scan to complete
    wait_enabled=${APPSCAN_WAIT:-true}

    #Wait for scan result timeout
    wait_timeout=${APPSCAN_WAIT_TIMEOUT:-900}
    
    if [[ -z $JOB_BASE_NAME ]]; then
        if [[ -z $TRAVIS_REPO_SLUG ]]; then
            SAST_JOB_NAME=$APPSCAN_APPNAME
            BUILD_ENGINE="Custom CI/CD"
            BUILD_NUM=""
            echo "Running in non CI/CD env, scan job name is: ${SAST_JOB_NAME}"
        else
            SAST_JOB_NAME=$(echo "$TRAVIS_REPO_SLUG" | cut -d'/' -f 2)_${TRAVIS_BRANCH}
            BUILD_ENGINE="Travis-CI"
            BUILD_NUM=${TRAVIS_BUILD_NUMBER}
            unset _JAVA_OPTIONS
            echo "Running in Travis, scan job name is: ${SAST_JOB_NAME}"
        fi
    else
        if [[ -z $GIT_URL || -z $GIT_BRANCH ]]; then
            SAST_JOB_NAME=${JOB_BASE_NAME}
        else
            SAST_JOB_NAME=$(basename "${GIT_URL}" .git)_$(basename "${GIT_BRANCH}")
        fi
        BUILD_ENGINE="Jenkins"
        BUILD_NUM=${BUILD_NUMBER}
        echo "Running in Jenkins, scan job name is: ${SAST_JOB_NAME}"
    fi
    
    #Trim whitespace from job name is any
    SAST_JOB_NAME=$(echo "$SAST_JOB_NAME" | tr ' ' '-')
}

install_client(){
    #Check if appscan CLI is already available, and install if not
    if type "appscan.sh" > /dev/null 2>&1; then
        client_version=$(appscan.sh version | head -1)
        echo "SAST client already installed, version: ${client_version}"
    else
        echo "SAST client not available, downloading"    
        curl -s https://cloud.appscan.com/api/SCX/StaticAnalyzer/SAClientUtil?os=linux -o "$HOME"/SAClientUtil.zip
        extdir=$(unzip -Z -1 "$HOME"/SAClientUtil.zip | head -1 | cut -d "/" -f1)
        unzip -q -n "$HOME"/SAClientUtil.zip -d "$HOME"/
        rm -f "$HOME"/SAClientUtil.zip
        clientpath="$HOME/${extdir}/bin"
        export PATH="$clientpath:$PATH"
        echo "SAST client setup is complete"
    fi
}

get_app_id(){
    #Login to AppScan on Cloud
    resp=$(appscan.sh api_login -u "$APPSCAN_TOKEN" -P "$APPSCAN_SECRET" -persist)
    if [[ "$resp" == "Authenticated successfully." ]]; then
        echo "$resp"
    else
        echo "Please verify the appscan_token and secret"
        return 1
    fi

    #Retrieve app-id for provided app-name
    appscan_appid=$(appscan.sh list_apps | grep "$APPSCAN_APPNAME" | awk '{print $3}')
    if [[ -z $appscan_appid ]]; then
        echo "No application could be found with name ${APPSCAN_APPNAME} Please check the appscan_appname"
        return 1
    else
        echo "Appscan app-id is: ${appscan_appid}"
    fi
}

generate_scan_file(){
    #Generate scan irx file
    echo ""
    echo "Generating irx file"
    if [[ -z $APPSCAN_CONFIG_FILE ]]; then
        appscan.sh prepare -n "${SAST_JOB_NAME}".irx
    elif [[ -f ${WORKSPACE}/${APPSCAN_CONFIG_FILE} ]]; then
        appscan.sh prepare -c "${APPSCAN_CONFIG_FILE}" -n "${SAST_JOB_NAME}".irx
    else
        echo "Invalid scan config path: ${APPSCAN_CONFIG_FILE}, Cannot generate irx file"
        return 1
    fi

    #Quit if irx file is not generated
    if [[ ! -f "${SAST_JOB_NAME}.irx" ]]; then
        echo "Failed to generate IRX file"
        return 1
    fi
}

submit_new_scan(){
    #Submit scan on cloud and retrieve job-id
    now=$(date +%Y-%m-%d_%H-%M-%S)
    appscan_jobid=$(appscan.sh queue_analysis -a "$appscan_appid" -f "${SAST_JOB_NAME}".irx -n "${SAST_JOB_NAME}"_"${now}" | tail -1)
    if [[ -z appscan_jobid || ${#appscan_jobid} -ne 36 ]]; then
        echo "Failed to submit scan, invalid scan id: '${appscan_jobid}'"
        return 1
    else
        echo "New scan submitted, scan-id: ${appscan_jobid}"
    fi

    #Retrieve scan status
    scan_status=$(appscan.sh status -i "$appscan_jobid")
}

get_scan_results(){
    waiting_since=$(date +%s)
    echo "Waiting for scan to complete"
    while true
    do
        echo "Scan status: ""$scan_status"
        if [[ "$scan_status" == "Pending" || "$scan_status" == "Running" || "$scan_status" == "Starting" || \
            "$scan_status" == "Initiating" || "$scan_status" == "FinishedRunning" || "$scan_status" == "InQueue" ]]; then
            if [[ $(expr $(date +%s) - "$waiting_since") -gt $wait_timeout ]]; then
                msg="Scan wait time limit of ${wait_timeout} seconds reached, "
                break
            else
                sleep 15
                scan_status=$(appscan.sh status -i "$appscan_jobid")
            fi
        else
            break
        fi
    done
    
    #Retrieve scan results only if scan completed successfully
    if [[ "$scan_status" != "Ready" ]]; then
        msg="${msg}Current scan status is: ${scan_status}\n \
        Please visit https://cloud.appscan.com/AsoCUI/serviceui/main/myapps/oneapp/${appscan_appid}/scans for more details"
        notify "${msg}"
        return 0
    else
        echo "Retrieving scan result"
        scan_results=$(appscan.sh info -i "$appscan_jobid" | grep LastSuccessfulExecution | cut -d "=" -f2)
    
        NIssues=$(echo "$scan_results" | jq '.NIssuesFound')
        NNewAppIssues=$(echo "$scan_results" | jq '.NNewAppIssues')
        NHighIssues=$(echo "$scan_results" | jq '.NHighIssues')
        NMediumIssues=$(echo "$scan_results" | jq '.NMediumIssues')
        NLowIssues=$(echo "$scan_results" | jq '.NLowIssues')
        NInfoIssues=$(echo "$scan_results" | jq '.NInfoIssues')

        appscan.sh get_result -i "$appscan_jobid" -d "${SAST_JOB_NAME}"_"${now}"_SAST.html -t html
        
        if [[ -f ${SAST_JOB_NAME}_${now}_SAST.html ]]; then
            REPORT_FILE_NAME=${SAST_JOB_NAME}_${now}_SAST.html
            
            if [[ "$BUILD_ENGINE" == "Jenkins" ]]; then
                echo "${SAST_JOB_NAME}"_"${now}"_SAST.html > REPORT_FILE_NAME.txt
            fi
        else
            echo "Failed to download scan HTML report"
            return 1
        fi
    fi
}

generate_pdf_report(){
    if [[ ! -z $REPORT_FILE_NAME && ! -z $APPSCAN_BOX_EMAIL ]]; then
        #Obtain access token for API requests
        status=$(curl -w "${http_code}" -s -H 'Content-Type: application/json' -d '{"KeyId":"'"$APPSCAN_TOKEN"'","KeySecret":"'"$APPSCAN_SECRET"'"}' \
            -X POST https://cloud.appscan.com/api/v2/Account/ApiKeyLogin -o token.json) 
            
        if [[ "$status" -eq 200 ]]; then
            acc_token=$(cat token.json | jq -r '.Token')
            #Request for PDF report
            echo "Requesting scan report in PDF format"
            status=$(curl -w "${http_code}" -s -H 'Content-Type: application/json' -H 'Authorization: Bearer '"$acc_token" -d "$(generate_payload)" \
                -X POST https://cloud.appscan.com/api/v2/Reports/Security/Scan/"$appscan_jobid" -o report_req.json)
                
            if [[ "$status" -eq 200 ]]; then
                reportid=$(cat report_req.json | jq -r '.Id')
                echo "PDF report id is ${reportid}"
                while true
                do
                    #Check PDF report request status
                    status=$(curl -w "${http_code}" -s -H 'Content-Type: application/json' -H 'Authorization: Bearer '"$acc_token" \
                        https://cloud.appscan.com/api/v2/Reports/"$reportid" -o report_status.json)
                        
                    if [[ "$status" -eq 200 ]]; then
                        report_status=$(cat report_status.json | jq -r '.Status')
                        progress=$(cat report_status.json | jq -r '.Progress')
                            
                        if [[ "$report_status" == "Ready" ]]; then
                            if [[ "$progress" -eq 100 ]]; then
                                #Download PDF report
                                status=$(curl -w "${http_code}" -s -H 'Content-Type: application/json' -H 'Accept: application/octet-stream' \
                                    -H 'Authorization: Bearer '"$acc_token" https://cloud.appscan.com/api/v2/Reports/Download/"$reportid" -o "${SAST_JOB_NAME}"_"${now}"_SAST.pdf)
                                
                                if [[ "$status" -eq 200 && -f ${SAST_JOB_NAME}_${now}_SAST.pdf ]]; then
                                    echo "Scan report successfully downloaded as PDF"
                                    
                                    #Save report file name in text for box upload in post build step
                                    REPORT_FILE_NAME=${SAST_JOB_NAME}_${now}_SAST.pdf
                                    echo "$REPORT_FILE_NAME" > REPORT_FILE_NAME.txt
                                    
                                    break
                                else
                                    echo "Scan PDF report download failed"
                                    break
                                fi
                            else
                                echo "Scan PDF report is Ready but progress is: ${progress}, cant download"
                                break
                            fi
                        elif [[ "$report_status" == "Failed" ]]; then
                            echo "Scan PDF report status is Failed"
                            break                            
                        else
                            echo "Waiting for Scan PDF report generation, status: ${report_status}, progress: ${progress}"
                            sleep 15
                        fi
                    else
                        echo "Scan PDF report status could not be fetched"
                        break
                    fi
                done
            else
                echo "Could not request PDF report for scan"
            fi
        else
            echo "Could not login to AppScan API, PDF report cannot be generated"
        fi
    fi
}

trigger_box_uploader_job(){
    if [[ ! -z $REPORT_FILE_NAME && ! -z $JENKINS_USER  && ! -z $JENKINS_TOKEN && ! -z JENKINS_JOB_URL ]]; then                        
        echo "Submitting scan report for Box upload"
        if [[ $JENKINS_JOB_URL != */ ]]; then
            JENKINS_JOB_URL="${JENKINS_JOB_URL}/"
        fi
        JENKINS_JOB_URL="${JENKINS_JOB_URL}buildWithParameters"
        status=$(curl -w %{http_code} -s -u "$JENKINS_USER":"$JENKINS_TOKEN" -F RECEPIENT="$APPSCAN_BOX_EMAIL" -F REPORT_FILE_NAME="$REPORT_FILE_NAME" \
            -F ScanReportFile=@"$REPORT_FILE_NAME" -X POST "$JENKINS_JOB_URL")
                
        if [[ "$status" -eq 201 ]]; then
            echo "Scan report sent for Box upload successfully!"
        else
            echo echo "Scan report could not be sent for Box upload status: ${status}"
        fi
    else
        echo "Building in non-Jenkins env, JENKINS_USER and JENKINS_TOKEN and JENKINS_JOB_URL must be set to upload report to Box"
    fi
}

validate_report(){
    msg="SAST scan completed, total number of issues: ${NIssues}, [New: ${NNewAppIssues}, High: ${NHighIssues}, Medium: ${NMediumIssues}, Low: ${NLowIssues}, Info: ${NInfoIssues}]\n"
    
    if [[ -n "$APPSCAN_NEW_ISSUE_LIMIT" && "$APPSCAN_NEW_ISSUE_LIMIT" -gt 0 ]]; then
        if [[ "$NNewAppIssues" -ge "$APPSCAN_NEW_ISSUE_LIMIT" ]]; then
            msg="${msg}Number of new issues detected is equal or exceeds limit of ${APPSCAN_NEW_ISSUE_LIMIT}, build failed"
            notify "${msg}"
            return 1
        fi
    fi
    
    if [[ -n "$APPSCAN_HIGH_ISSUE_LIMIT" && "$APPSCAN_HIGH_ISSUE_LIMIT" -gt 0 ]]; then
        if [[ "$NHighIssues" -ge "$APPSCAN_HIGH_ISSUE_LIMIT" ]]; then
            msg="${msg}Number of high issues detected is equal or exceeds limit of ${APPSCAN_HIGH_ISSUE_LIMIT}, build failed"
            notify "${msg}"
            return 1
        fi
    fi
        
    if [[ -n "$APPSCAN_MED_ISSUE_LIMIT" && "$APPSCAN_MED_ISSUE_LIMIT" -gt 0 ]]; then
        if [[ "$NMediumIssues" -ge "$APPSCAN_MED_ISSUE_LIMIT" ]]; then
            msg="${msg}Number of medium issues detected is equal or exceeds limit of ${APPSCAN_MED_ISSUE_LIMIT}, build failed"
            notify "${msg}"
            return 1
        fi
    fi
    
    if [[ -n "$APPSCAN_LOW_ISSUE_LIMIT" && "$APPSCAN_LOW_ISSUE_LIMIT" -gt 0 ]]; then
        if [[ "$NLowIssues" -ge "$APPSCAN_LOW_ISSUE_LIMIT" ]]; then
            msg="${msg}Number of low issues detected is equal or exceeds limit of ${APPSCAN_LOW_ISSUE_LIMIT}, build failed"
            notify "${msg}"
            return 1
        fi
    fi
        
    if [[ -n "$APPSCAN_TOTAL_ISSUE_LIMIT" && "$APPSCAN_TOTAL_ISSUE_LIMIT" -gt 0 ]]; then
        if [[ "$NIssues" -ge "$APPSCAN_TOTAL_ISSUE_LIMIT" ]]; then
            msg="${msg}Total number of issues detected is equal or exceeds limit of ${APPSCAN_TOTAL_ISSUE_LIMIT}, build failed"
            notify "${msg}"
            return 1
        fi
    fi
        
    #Send success notification
    notify "${msg}"
}

#Main
validate_parameters
set_variables
install_client
get_app_id
generate_scan_file
submit_new_scan

#Check if script should wait for scan to complete and fetch results
if [[ $wait_enabled == true ]]; then
    get_scan_results
    generate_pdf_report
    
    #Invoke Box Helper Jenkins job via remote URL only of running outside Jenkins
    if [[ "$BUILD_ENGINE" != "Jenkins" ]]; then
        trigger_box_uploader_job
    else
        echo "Building in Jenkins, report will be uploaded to Box from post build step"
    fi
    
    validate_report
else
    msg="Scan submited successfully, scan-id: ${appscan_jobid}, scan-status: ${scan_status}, not waiting for scan as configured\n \
    Please log into AppScan on cloud web interface for scan report:\n \
    https://cloud.appscan.com/AsoCUI/serviceui/main/myapps/oneapp/${appscan_appid}/scans"
    notify "${msg}"
fi