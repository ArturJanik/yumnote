require 'rails_helper'

describe SessionsController do
  describe 'POST /api/login', :type => :request do
    let(:user) { create(:user) }
    let(:email) { user.email }
    let(:password) { user.password }

    headers = {
      'ACCEPT': 'application/json'
    }

    context 'with incorrect data' do
      it "does not allow access" do
        post '/api/login', params: { user: { email: email, password: 'wrongpassword' } }, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'with correct data' do
      it "should login user" do
        post '/api/login', params: { user: { email: email, password: password } }, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'DELETE /api/logout', :type => :request do
    let(:user) { create(:user) }
    let(:token) { user.auth_token }

    it "should logout user" do
      headers = {
        'ACCEPT': 'application/json',
        'Authorization': "Token #{token}",
        'token': token
      }
      delete '/api/logout', headers: headers
      expect(response.status).to eq(200)
    end
  end
end
