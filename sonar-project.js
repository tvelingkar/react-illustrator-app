const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
    {
        serverUrl: "https://dbg-sonarqube.rtp.raleigh.ibm.com",
        token: "e464675f4e994164a9d79c36040b76be5940a071",
        options: {
            "sonar.sources": "./src",
            "sonar.exclusions": "**/__tests__/**",
            "sonar.tests": "./src/__tests__",
            "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
            "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
            "sonar.testExecutionReportPaths": "reports/test-report.xml",
        },
    },
    () => { },
);