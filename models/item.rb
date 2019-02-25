require 'aws-record'

class Item
  include Aws::Record

  set_table_name ENV['ITEMS_TABLE']

  string_attr :date, hash_key: true
  string_attr :time_guid, range_key: true
  string_attr :guid
  datetime_attr :created_at
  string_attr :link
  string_attr :title
  string_attr :description

  if ENV['AWS_SAM_LOCAL']
    local_client = Aws::DynamoDB::Client.new(
      endpoint: 'http://host.docker.internal:8000'
    )
    self.configure_client(client: local_client)
  end
end