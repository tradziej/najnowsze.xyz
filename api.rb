require 'json'
require_relative 'models/item'

def handler(event:, context:)
  {
    statusCode: 200,
    body: JSON.generate({
      items: Item.recent
    })
  }
end