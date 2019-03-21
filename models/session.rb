require 'aws-record'
require 'xkpassword'

class Session
  include Aws::Record

  set_table_name ENV['SESSIONS_TABLE']

  string_attr :token, hash_key: true
  datetime_attr :read_to
  integer_attr :read_count
  string_attr :settings

  def mark_as_read!
    self.read_to = Time.now
    self.read_count += 1
    save!
  end

  class << self
    def find_or_create(token)
      record = find(token: token) unless token.to_s.empty?
      return record if record

      record = Session.new(token: generate_token, read_count: 0)
      record.save
      record
    end

    private

    def generate_token
      token = nil
      loop do
        generator = XKPassword::Generator.new
        token = generator.generate(words: 3, separator: '').downcase
        break unless find(token: token)
      end
      token
    end
  end

  if ENV['AWS_SAM_LOCAL']
    local_client = Aws::DynamoDB::Client.new(
      endpoint: 'http://host.docker.internal:8000'
    )
    configure_client(client: local_client)
  end
end
