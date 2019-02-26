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

  def as_json(options={})
    {
      created_at: created_at,
      title: title,
      description: description,
      guid: guid,
      link: link
    }
  end

  def to_json(*options)
    as_json(*options).to_json(*options)
  end

  def self.yesterday
    Item.query(
      key_condition_expression: '#H = :h',
      expression_attribute_names: {
        '#H' => 'date'
      },
      expression_attribute_values: {
        ':h' => Date.today.prev_day.to_s
      }
    ).to_a
  end

  def self.today
    Item.query(
      key_condition_expression: '#H = :h',
      expression_attribute_names: {
        '#H' => 'date'
      },
      expression_attribute_values: {
        ':h' => Date.today.to_s
      }
    ).to_a
  end

  def self.recent
    self.yesterday + self.today
  end

  if ENV['AWS_SAM_LOCAL']
    local_client = Aws::DynamoDB::Client.new(
      endpoint: 'http://host.docker.internal:8000'
    )
    self.configure_client(client: local_client)
  end
end