require 'rack/test'

ENV['APP_ENV'] ||= 'test'

require 'vcr'
require 'webmock'

VCR.configure do |c|
  c.cassette_library_dir = 'spec/vcr_cassettes'
  c.hook_into :webmock
end

Dir['./spec/support/**/*.rb'].sort.each { |f| require f }
