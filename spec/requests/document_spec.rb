require 'rails_helper'

describe DocumentsController do
  describe 'GET /api/documents/:slug', :type => :request do
    context 'with not existing slug' do
      it "fails with 404" do
        get '/api/documents/not-existing'
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(404)
      end
    end

    context 'with existing slug' do
      let!(:document) { create(:document, title: 'Document title', slug: 'document-title') }
      let(:slug) { document.slug }

      it "returns document" do
        get "/api/documents/#{slug}"
        expect(response.content_type).to eq("application/json")
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)['document']).not_to be_empty
      end
    end
  end
end