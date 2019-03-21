RSpec.shared_examples 'headers examples' do |parameter|
  let(:handler) { parameter }
  let(:sessionDouble) { Struct.new(:token, :read_to) }
  let(:session) { sessionDouble.new('faketoken', nil) }

  it 'returns correct headers' do
    allow(Session).to receive(:find_or_create).and_return(session)

    response = send(handler, event: event, context: nil)

    expect(response[:headers]).to include(:'X-Session-Token', :'X-Read-To')
    expect(response[:headers][:'Content-Type']).to eq('application/json')
    expect(response[:headers][:'Access-Control-Allow-Origin']).to eq('*')
    expect(response[:headers][:'X-Session-Token']).to eq(session.token)
  end
end
