AWS_REGION ?= eu-central-1
S3_BUCKET ?= najnowsze-xyz-deployment
STACK_NAME ?= najnowszexyz

install:
	-rm -rf vendor/
	@bundle install --no-deployment --with test

install-deployment:
	@docker run -v `pwd`:`pwd` -w `pwd` -i -t lambci/lambda:build-ruby2.5 \
			bundle install --deployment --without test development

test:
	@bundle exec rspec spec

create-s3-bucket:
	if ! aws s3api head-bucket --bucket $(S3_BUCKET) --region $(AWS_REGION) 2>/dev/null; then \
		aws s3 mb s3://$(S3_BUCKET) --region $(AWS_REGION) \
		; \
	fi

sam-package:
	@sam package \
    --template-file template.yaml \
    --output-template-file packaged.yaml \
    --s3-bucket $(S3_BUCKET) \
		--region $(AWS_REGION)

sam-deploy:
	@sam deploy \
    --template-file packaged.yaml \
    --capabilities CAPABILITY_IAM \
    --stack-name $(STACK_NAME) \
		--region $(AWS_REGION)

deploy: install-deployment create-s3-bucket sam-package sam-deploy

destroy:
	@aws cloudformation delete-stack --stack-name $(STACK_NAME)

start-local-dynamodb:
	@docker run -d -p 8000:8000 amazon/dynamodb-local

validate-template:
	@aws cloudformation validate-template \
			--template-body file://template.yaml

run:
	@sam local start-api --env-vars env.json

.PHONY: test