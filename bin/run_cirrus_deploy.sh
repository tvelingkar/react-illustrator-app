#!/usr/bin/env bash
docker login -u=pipeline-demo+$CIO_USER -p=$CIO_PASSWORD registry.cirrus.ibm.com
docker tag local-image:some-version registry.cirrus.ibm.com/pipeline-demo/dev-ops-pipeline-demo:$APP_VERSION
docker push registry.cirrus.ibm.com/pipeline-demo/dev-ops-pipeline-demo:$APP_VERSION