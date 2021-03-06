require 'spec_helper'
require './api'

describe 'API' do
  describe '#items_handler' do
    let(:event) do
      {
        'httpMethod' => 'GET', 'body' => nil, 'resource' => '/items', 'requestContext' => {
          'resourceId' => '123456', 'apiId' => '1234567890', 'resourcePath' => '/items', 'httpMethod' => 'GET', 'requestId' => 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef', 'accountId' => '123456789012', 'stage' => 'prod', 'identity' => {
            'apiKey' => nil, 'userArn' => nil, 'cognitoAuthenticationType' => nil, 'caller' => nil, 'userAgent' => 'Custom User Agent String', 'user' => nil, 'cognitoIdentityPoolId' => nil, 'cognitoAuthenticationProvider' => nil, 'sourceIp' => '127.0.0.1', 'accountId' => nil
          }, 'extendedRequestId' => nil, 'path' => '/items'
        }, 'queryStringParameters' => nil, 'headers' => {
          'Host' => '127.0.0.1:3000', 'User-Agent' => 'curl/7.54.0', 'Accept' => '*/*', 'Content-Type' => 'application/json', 'X-Forwarded-Proto' => 'http', 'X-Forwarded-Port' => '3000'
        }, 'pathParameters' => nil, 'stageVariables' => nil, 'path' => '/items', 'isBase64Encoded' => false
      }
    end

    let(:sessionDouble) { Struct.new(:token, :read_to) }
    let(:session) { sessionDouble.new('faketoken', nil) }
    let(:itemDouble) { Struct.new(:title) }

    describe 'headers' do
      before do
        expect(Item).to receive(:recent).and_return([])
      end
      include_examples 'headers examples', 'items_handler'
    end

    it 'returns array of items' do
      expect(Session).to receive(:find_or_create).with(nil).and_return(session)
      items = [itemDouble.new(title: 'first'), itemDouble.new(title: 'second')]
      expect(Item).to receive(:recent).and_return(items)

      response = items_handler(event: event, context: nil)
      expect(response[:body]).to eq(JSON.generate(items: items))
    end
  end

  describe '#read_handler' do
    let(:event) do
      {
        'httpMethod' => 'PUT', 'body' => nil, 'resource' => '/read', 'requestContext' => {
          'resourceId' => '123456', 'apiId' => '1234567890', 'resourcePath' => '/read', 'httpMethod' => 'PUT', 'requestId' => 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef', 'accountId' => '123456789012', 'stage' => 'prod', 'identity' => {
            'apiKey' => nil, 'userArn' => nil, 'cognitoAuthenticationType' => nil, 'caller' => nil, 'userAgent' => 'Custom User Agent String', 'user' => nil, 'cognitoIdentityPoolId' => nil, 'cognitoAuthenticationProvider' => nil, 'sourceIp' => '127.0.0.1', 'accountId' => nil
          }, 'extendedRequestId' => nil, 'path' => '/read'
        }, 'queryStringParameters' => nil, 'headers' => {
          'Host' => '127.0.0.1:3000', 'User-Agent' => 'curl/7.54.0', 'Accept' => '*/*', 'Content-Type' => 'application/json', 'X-Session-Token' => 'faketoken', 'X-Forwarded-Proto' => 'http', 'X-Forwarded-Port' => '3000'
        }, 'pathParameters' => nil, 'stageVariables' => nil, 'path' => '/read', 'isBase64Encoded' => false
      }
    end

    describe 'headers' do
      include_examples 'headers examples', 'read_handler' do
        let(:sessionDouble) { Struct.new(:token, :read_to) }
        let(:session) do
          s = sessionDouble.new('faketoken', nil)
          allow(s).to receive(:mark_as_read!).and_return(false)
          s
        end
      end
    end
  end
end
