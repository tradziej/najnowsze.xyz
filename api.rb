require 'json'
require_relative 'models/item'
require_relative 'models/session'

def items_handler(event:, context:)
  response(body: { items: Item.recent }, headers: event['headers'])
end

def readed_handler(event:, context:)
  headers = event['headers']
  if current_session(headers).mark_as_readed!
    return response(body: { status: :ok }, status_code: 200, headers: headers)
  end

  response(body: { error: 'Error on update' }, status_code: 400, headers: headers)
end

def current_session(headers)
  token = headers['X-Session-Token']
  session ||= Session.find_or_create(token)
  session
end

def response(status_code: 200, body:, headers: nil)
  custom_headers = {}
  if headers
    session = current_session(headers)
    custom_headers = {
      'X-Session-Token': session.token,
      'X-Readed-To': session.readed_to
    }
  end

  {
    statusCode: status_code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Session-Token, X-Readed-To',
      'Access-Control-Expose-Headers': 'X-Session-Token, X-Readed-To'
    }.merge!(custom_headers),
    body: JSON.generate(body)
  }
end
