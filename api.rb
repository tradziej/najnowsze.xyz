require 'json'
require_relative 'models/item'
require_relative 'models/session'

def items_handler(event:, context:)
  session = current_session(event['headers'])
  {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Session-Token': session.token,
      'X-Readed-To': session.readed_to
    },
    body: JSON.generate(
      items: Item.recent
    )
  }
end

def current_session(headers)
  token = headers['X-Session-Token']
  Session.find_or_create(token)
end
