#!/usr/bin/env bash
docker build -t dev-ops-pipeline-demo:$APP_VERSION .
docker login -u=pipeline-demo+$CIO_USER -p=$CIO_PASSWORD registry.cirrus.ibm.com
docker tag dev-ops-pipeline-demo:$APP_VERSION registry.cirrus.ibm.com/pipeline-demo/dev-ops-pipeline-demo:$APP_VERSION
docker push registry.cirrus.ibm.com/pipeline-demo/dev-ops-pipeline-demo:$APP_VERSION