require 'rails_helper'

describe FoodnotesController do
  describe 'GET /api/foodnotes/today', :type => :request do
    context 'when reached as unauth user' do
      it "does not show any data" do
        get '/api/foodnotes/today'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'when reached as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "shows user foodnotes" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/foodnotes/today', params: {}, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end
  
  describe '#create' do
    let(:foodnote) { create(:foodnote) }

    context 'when foodnote is created' do
      subject { foodnote.creation_date.to_s }

      it { should eq(Date.parse('20190311').to_s) }
    end
  end
end
