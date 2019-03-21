require 'rails_helper'

describe UsersController do
  describe 'POST /api/changepassword', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        post '/api/changepassword'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "should update password" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        post '/api/changepassword', params: { user: { password: 'password', new_password: 'password2' } }, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)['message']).to eq('Password changed successfully.')
      end

      it "should fail updating password" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        post '/api/changepassword', params: { user: { password: 'wrongpassword', new_password: 'password2' } }, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(JSON.parse(response.body)['errors']['password']).to eq('Old password incorrect')
      end
    end
  end

  describe 'GET /api/profile', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        get '/api/profile'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "should return profile info" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/profile', headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'POST /api/users', :type => :request do
    context 'with no params' do
      it "raises an exception" do
        expect{ post('/api/users', {}) }.to raise_error ActionController::ParameterMissing
      end
    end
    
    context 'with incorrect params' do
      it "returns 422 error" do
        post '/api/users', params: { user: { username: '', email: '', password: '' } }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(422)
      end
    end
    
    context 'with correct params' do
      it "returns auth token" do
        post '/api/users', params: { user: { username: 'CorrectUserName', email: 'correct@email.com', password: 'correct123456', time_zone: 'Europe/Berlin' } }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)['token']).not_to be_empty
      end
    end
  end

  describe 'PUT /api/users', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        put "/api/users/1"
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'with incorrect params' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns 422 error" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }

        put "/api/users/#{user.id}", params: { user: { time_zone: '' } }, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(400)
      end
    end
    
    context 'with correct params' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns timezone" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }

        put "/api/users/#{user.id}", params: { user: { time_zone: 'Europe/Warsaw' } }, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)['timezone']).to eq('Europe/Warsaw')
      end
    end
  end
end
