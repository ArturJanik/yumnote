require 'rails_helper'

describe CategoriesController do
  describe 'GET /api/categories', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        get '/api/categories'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns categories" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/categories', headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end
end
