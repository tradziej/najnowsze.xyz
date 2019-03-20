require 'spec_helper'
require 'feed'

describe Feed do
  let(:feed) { described_class }

  before do
    VCR.insert_cassette 'feed'
  end

  after do
    VCR.eject_cassette
  end

  it 'fetches popular items from wykop.pl' do
    expect(feed.new.to_a.size).to eq(50)
  end
end
