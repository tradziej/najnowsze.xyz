# najnowsze.xyz

## Requirements

* AWS CLI already [configured](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) with at least PowerUser permission
* [Ruby](https://www.ruby-lang.org/en/documentation/installation/) 2.5 installed
* [Docker installed](https://www.docker.com/community-edition)

Please create `.env.json` file:
```
cp .env.json.sample .env.json
```

You need to have bundler installed:
```
gem install bundler
```

Install gems:
```
bundle install --no-deployment --with test
```

Install gems to `vendor/bundle/` directory:
```
bundle install --deployment --without test development
```
It is needed for local testing and deployment.

Native extension workaround (needed for `ox` gem):
```
docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-ruby2.5 \
    bundle install --deployment --without test development
```
Ref: [twitter](https://twitter.com/alexwwood/status/1068421791918448640) or [blog](https://www.cookieshq.co.uk/posts/how-to-build-a-serverless-twitter-bot-with-ruby-and-aws-lambda)


## Local development
You need to have DynamoDB local](https://hub.docker.com/r/amazon/dynamodb-local).
```
docker run -d -p 8000:8000 amazon/dynamodb-local
```

SAM local doesn't evaluate CloudFormation conditionals so you must create DynamoDB Tables by yourself:
```
aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name items-table --attribute-definitions AttributeName=date,AttributeType=S AttributeName=time_guid,AttributeType=S --key-schema AttributeName=date,KeyType=HASH AttributeName=time_guid,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

### Fetcher
```
sam local invoke --env-vars env.json --no-event FetcherFunction
```

### API
```
sam local invoke --env-vars env.json --no-event ApiFunction
```

```
sam local start-api --env-vars env.json
```

```
curl -i -H "Content-Type: application/json" http://127.0.0.1:3000/items
```

## Testing
```
rspec spec
```

## Packaging and deployment
### Lambda backend

You need to have a `S3 bucket` to upload zipped functions. You could create it like that:
```
aws s3 mb s3://BUCKET_NAME
```

```
bundle install --deployment --without test development
```

To package functions as ZIP and upload on S3 bucket:
```
sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket BUCKET_NAME
```

To deploy the packaged template:
```
sam deploy \
    --template-file packaged.yaml \
    --capabilities CAPABILITY_IAM \
    --stack-name <YOUR STACK NAME>
```

How to set up Amazon's API Gateway custom domain with Cloudflare: [instructions](http://www.leanx.eu/tutorials/set-up-amazons-api-gateway-custom-domain-with-cloudflare).

### React frontend
```
cd client && yarn prod
```

To upload files to previously created S3 bucket:
```
aws s3 sync --acl public-read dist/ s3://{BUCKET_NAME}
``` 

To invalidate CloudFront cache:
```
aws cloudfront create-invalidation --distribution-id {DISTRIBUTION_ID} --paths '/*'
```

## Makefile
Project contains the [Makefile](Makefile) which you could use for several common tasks after customisation.