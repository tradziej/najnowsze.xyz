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
bundle install
```

Install gems to `vendor/bundle/` directory:
```
bundle install --deployment --without test development
```
It is needed for local testing and deployment.

Native extension workaround (needed for `ox` gem):
```
docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-ruby2.5 bundle install --deployment
```
Ref: [twitter](https://twitter.com/alexwwood/status/1068421791918448640) or [blog](https://www.cookieshq.co.uk/posts/how-to-build-a-serverless-twitter-bot-with-ruby-and-aws-lambda)


## Local development
You need to have DynamoDB local](https://hub.docker.com/r/amazon/dynamodb-local).
```
docker run -d -p 8000:8000 amazon/dynamodb-local
```

SAM local doesn't evaluate CloudFormation conditionals so you must create DynamoDB Tables by yourself:
```
aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name items-table --attribute-definitions AttributeName=date,AttributeType=S AttributeName=guid,AttributeType=S --key-schema AttributeName=date,KeyType=HASH AttributeName=guid,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1
```

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

### Fetcher
```
sam local invoke --env-vars env.json --no-event FetcherFunction
```