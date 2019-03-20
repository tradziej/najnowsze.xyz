require 'json'
require_relative 'models/item'

def items_handler(event:, context:)
  {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.generate(
      items: Item.recent
    )
  }
end
