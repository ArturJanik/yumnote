require 'rails_helper'

describe ProductsController do
  describe 'GET /api/products/currentuser', :type => :request do
    context 'as unauth user' do
      it "fails with 401" do
        get '/api/products/currentuser'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }

      it "returns user products list" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/products/currentuser', headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)).to be_a_kind_of Array
      end
    end
  end

  describe 'GET /api/products/latest', :type => :request do
    context 'as unauth user' do
      it "fails with 401" do
        get '/api/products/latest'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }

      it "returns latest user products list" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get '/api/products/latest', headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)).to have_key('products')
      end
    end
  end

  describe 'GET /api/categories/:categoryId/products', :type => :request do
    context 'as unauth user' do
      let(:category) { create :category }
      it "fails with 401" do
        get "/api/categories/#{category.id}/products"
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let!(:user) { create :user }
      let(:token) { user.auth_token }
      let(:categories) { create_pair :product_category }
      let!(:product) { create :product, category: categories.first, user: user }

      it "returns category related products list" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get "/api/categories/#{categories.first.id}/products", headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)).not_to be_empty
      end

      it "fails with 404" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get "/api/categories/0/products", headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'GET /api/products/:id', :type => :request do
    context 'as unauth user' do
      let(:product) { create :product }
      it "fails with 401" do
        get "/api/products/#{product.id}"
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let!(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:product) { create :product, user: user }
      let(:id) { product.id }

      it "returns form related product data" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get "/api/products/#{id}", headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)['product']).to have_key('kcal')
        expect(JSON.parse(response.body)['product']).not_to have_key('created_at')
      end

      it "fails with 404" do
        headers = {
          'ACCEPT': 'application/json',
          'Authorization': "Token #{token}",
          'token': token
        }
        get "/api/products/0", headers: headers
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(404)
      end
    end
  end

  describe 'POST /api/products', :type => :request do
    context 'as unauth user' do
      let!(:category) { create :category }
      let(:params) { { product: { 
        category_id: category.id,
        name: 'Some product',
        kcal: 40,
        carb: 30,
        fat: 20,
        prot: 10,
        amount: 1,
      }}}

      it "fails with 401" do
        post "/api/products", params: params
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:category) { create :category }

      context 'with correct params' do
        let(:params) { { product: { 
          category_id: category.id,
          name: 'Some product',
          kcal: 40,
          carb: 30,
          fat: 20,
          prot: 10,
          amount: 1,
        }}}

        it "returns created product" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          post "/api/products", params: params, headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
          expect(JSON.parse(response.body)['product']).to have_key('kcal')
          expect(JSON.parse(response.body)['product']['kcal']).to eq(40)
        end
      end

      context 'with incorrect params' do
        let(:params) { { product: { 
          category_id: 0,
          name: 'Some product'
        }}}

        it "fails with 400" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          post "/api/products", params: params, headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(400)
        end
      end
    end
  end

  describe 'PUT /api/products/:id', :type => :request do
    context 'as unauth user' do
      let!(:product) { create :product }
      let(:id) { product.id }
      let(:params) {{ product: { name: 'New name' } }}

      it "fails with 401" do
        put "/api/products/#{id}", params: params
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:product) { create :product, user: user }
      let(:id) { product.id }

      context 'with correct params' do
        it "returns updated product data" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          put "/api/products/#{id}", params: { product: { name: 'New name' }}, headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
          expect(JSON.parse(response.body)['product']).to have_key('kcal')
          expect(JSON.parse(response.body)['product']['name']).to eq('New name')
        end
      end

      context 'with incorrect params' do
        it "fails with status 400" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          put "/api/products/#{id}", params: { product: { name: '' }}, headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(400)
        end
      end

      context 'when product does not exist' do
        it "fails with status 404" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          put "/api/products/0", params: { product: { name: 'New name' }}, headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(404)
        end
      end
    end
  end

  describe 'DELETE /api/products/:id', :type => :request do
    context 'as unauth user' do
      let!(:product) { create :product }
      let(:id) { product.id }

      it "fails with 401" do
        delete "/api/products/#{id}"
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:product) { create :product, user: user }
      let!(:product2) { create :product }
      let(:id) { product.id }
      let(:id2) { product2.id }

      context 'when product owned by user' do
        it "returns status 200" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          delete "/api/products/#{id}", headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
        end
      end

      context 'when product not owned by user' do
        it "fails with status 404" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          delete "/api/products/#{id2}", headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(404)
        end
      end

      context 'when product does not exist' do
        it "fails with status 404" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          delete "/api/products/0", headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(404)
        end
      end
    end
  end

  describe 'PATCH /api/products/:id/toggle_visibility', :type => :request do
    context 'as unauth user' do
      let!(:product) { create :product }
      let(:id) { product.id }

      it "fails with 401" do
        patch "/api/products/#{id}/toggle_visibility"
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(401)
      end
    end

    context 'as auth user' do
      let(:user) { create :user }
      let(:token) { user.auth_token }
      let!(:product) { create :product, user: user }
      let!(:product2) { create :product }
      let(:id) { product.id }
      let(:id2) { product2.id }

      context 'when product owned by user' do
        it "returns status 200" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          patch "/api/products/#{id}/toggle_visibility", headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(200)
        end
      end

      context 'when product not owned by user' do
        it "fails with status 404" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          patch "/api/products/#{id2}/toggle_visibility", headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(404)
        end
      end

      context 'when product does not exist' do
        it "fails with status 404" do
          headers = {
            'ACCEPT': 'application/json',
            'Authorization': "Token #{token}",
            'token': token
          }
          patch "/api/products/0/toggle_visibility", headers: headers
          expect(response.content_type).to eq("application/json")
          expect(response.status).to eq(404)
        end
      end
    end
  end
end