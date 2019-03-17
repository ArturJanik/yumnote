require 'rails_helper'

describe PasswordsController do
  describe 'POST /api/password/forgot', :type => :request do
    context 'with empty email' do
      it "fails" do
        post '/api/password/forgot', params: { email: nil }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(403)
      end
    end

    context 'with existing email' do
      let(:user) { create(:user) }
      let(:email) { user.email }

      it "sends success response" do
        post '/api/password/forgot', params: { email: email }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end

    context 'with not existing email' do
      it "sends success response" do
        post '/api/password/forgot', params: { email: 'notexisting@example.com' }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'POST /api/password/reset', :type => :request do
    context 'with empty params' do
      it "fails with 404" do
        post '/api/password/reset', params: { password: '', pass_token: '' }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(404)
      end
    end
    
    context 'with incorrect params' do
      let!(:user) { create(:user) }

      it "fails with 404" do
        user.generate_password_token
        post '/api/password/reset', params: { password: 'newpassword', pass_token: 'wrongtoken' }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(404)
      end
    end
    
    context 'with correct params' do
      let!(:user) { create(:user) }
      let(:token) { 
        user.generate_password_token 
        user.reset_password_token
      }

      it "sends success response" do
        post '/api/password/reset', params: { password: 'newpassword', pass_token: token }
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end
end
