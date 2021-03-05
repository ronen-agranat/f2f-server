#!/bin/bash

# Deploy to CloudFormation

# Requires:
#  nest-lambda.yaml CloudFormation template
#  .aws credentials file
#  S3 bucket to exist
#  deploy/ directory needs to exist

npm install
nest build
npm prune --production
# TODO: Run tests
rm deploy/nest-lambda.zip
zip -r deploy/nest-lambda.zip dist/ node_modules
aws cloudformation package --template-file nest-lambda.yaml --s3-bucket ronen-agranat-f2f-test --output-template-file deploy/nest-lambda.out.yaml
aws cloudformation deploy --template-file deploy/nest-lambda.out.yaml --stack-name nest-lambda --capabilities CAPABILITY_IAM