require_relative 'lib/feed'
require_relative 'models/item'

def handler(event:, context:)
  Feed.new.each do |item|
    date = item[:date].to_date.to_s
    time = item[:date].strftime('%H:%M:%S')
    guid = item[:guid].split('/')[-1]
    time_guid = "#{time}-#{guid}"
    return if Item.find(date: date, time_guid: time_guid)

    Item.new(
      date: date,
      time_guid: time_guid,
      created_at: item[:date],
      promoted_at: DateTime.now,
      guid: item[:guid],
      link: item[:link],
      title: item[:title],
      description: item[:description]
    ).save
  end
end
