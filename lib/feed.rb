# frozen_string_literal: true

require 'net/http'
require 'ox'

class Feed
  include Enumerable

  def each
    document.locate('channel/item').each do |item|
      yield(
        date: Date.parse(item.locate('pubDate').first.text),
        title: item.locate('title').first.text,
        description: item.locate('description').first.text,
        link: item.locate('link').first.text,
        comments: item.locate('comments').first.text
      )
    end
  end

 private
  def document
    Ox.load(xml)
  end

  def xml
    Net::HTTP.get(url)
  end

  def url
    URI('https://wykop-rss.now.sh/promoted')
  end
end