require 'rails_helper'

describe FoodnotesController do
  describe 'GET /api/foodnotes/today', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        get '/api/foodnotes/today'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns user foodnotes" do
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

  describe 'GET /api/foodnotes/yesterday', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        get '/api/foodnotes/yesterday'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns user foodnotes" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/foodnotes/yesterday', params: {}, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'GET /api/foodnotes/20190223', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        get '/api/foodnotes/20190223'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns user foodnotes" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/foodnotes/20190223', params: {}, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end

  describe 'POST /api/foodnotes', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        post '/api/foodnotes'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:product) { create :product }

      describe 'creates foodnote' do
        before(:example) do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          params = {
            product_id: Product.last.id,
            foodnote: {
              amount: 10,
              creation_date: 20190223
            }
          }
          post '/api/foodnotes', params: params, headers: headers
        end
  
        it "returns json response" do
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
        end
      end


      describe 'fails on creation' do
        before(:example) do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          params = {
            product_id: Product.last.id,
            foodnote: {
              amount: 10,
              creation_date: nil
            }
          }
          post '/api/foodnotes', params: params, headers: headers
        end

        it "return json error" do
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(400)
        end
      end
    end
  end

  describe 'PUT /api/foodnotes', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        put '/api/foodnotes/2'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:foodnote) { create :foodnote, user: user }

      describe 'updates foodnote with correct params' do
        before(:example) do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          params = {
            foodnote: {
              amount: 11
            }
          }
          put "/api/foodnotes/#{foodnote.id}", params: params, headers: headers
        end
  
        it "returns json response" do
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
        end
      end

      describe 'fails on update with incorrect params' do
        before(:example) do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          params = {
            foodnote: {
              amount: 'xavsd'
            }
          }
          put "/api/foodnotes/#{foodnote.id}", params: params, headers: headers
        end

        it "return json error" do
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(400)
        end
      end
    end
  end

  describe 'DELETE /api/foodnotes', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        delete '/api/foodnotes/2'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:foodnote) { create :foodnote, user: user }
      let!(:other_foodnote) { create :other_foodnote }

      describe 'deletes current user foodnote' do
        before(:example) do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          delete "/api/foodnotes/#{foodnote.id}", headers: headers
        end
  
        it "returns json response" do
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
        end
      end

      describe 'fails on delete of other users foodnote' do
        before(:example) do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          delete "/api/foodnotes/#{other_foodnote.id}", headers: headers
        end

        it "return json error" do
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(404)
        end
      end
    end
  end

  describe 'GET /api/foodnotes/statistics', :type => :request do
    context 'as unauth user' do
      it "does not allow access" do
        delete '/api/foodnotes/statistics'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'when reached as authorized user' do
      let(:user) { create(:user) }
      let(:token) { user.auth_token }

      it "returns user statistics" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/foodnotes/statistics', params: {}, headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
      end
    end
  end
end
