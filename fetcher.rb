require_relative 'lib/feed'
require_relative 'app/models/item'

def handler(event:, context:)
  Feed.new.each do |item|
    return if Item.find(date: item[:date], guid: item[:guid])
    
    Item.new(
      date: item[:date],
      guid: item[:guid],
      link: item[:link],
      title: item[:title],
      description: item[:description]
    ).save
  end
end