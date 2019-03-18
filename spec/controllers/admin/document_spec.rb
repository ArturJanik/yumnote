require 'rails_helper'

describe Admin::DocumentsController, type: :controller do
  # required to check rendered content
  render_views

  let(:page) { Capybara::Node::Simple.new(response.body) }
  let!(:user) { create(:admin) }
  before { sign_in user }

  let!(:document) { create(:admin_document) }

  let(:valid_attributes) { attributes_for(:document) }
  let(:invalid_attributes) { { title: '' } }

  describe "GET index" do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
    it 'should render document list' do
      get :index
      expect(page).to have_css("form[action='/admin/documents/batch_action']")
      expect(page).to have_xpath("//a[@href='/admin/documents/new']")
    end
  end

  describe "GET new" do
    it 'returns http success' do
      get :new
      expect(response).to have_http_status(:success)
    end
    it 'should render new document form' do
      get :new
      expect(page).to have_css("form[action='/admin/documents']")
    end
  end

  describe "POST create" do
    context "with valid params" do
      it 'creates a new Document' do
        expect {
          post :create, params: { document: valid_attributes }
        }.to change(Document, :count).by(1)
      end

      it "redirects to the created document" do
        post :create, params: { document: valid_attributes }
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(admin_document_path(Document.last))
      end

      it 'should create document' do
        post :create, params: { document: valid_attributes }
        document = Document.last

        expect(document.title).to eq(valid_attributes[:title])
        expect(document.content).to eq(valid_attributes[:content])
        expect(document.short_content).to eq(valid_attributes[:short_content])
        expect(document.slug).to eq('document-title')
      end

      context "with duplicate name" do
        it 'should generate unique slug' do
          2.times do post :create, params: { document: valid_attributes } end
          document = Document.last

          expect(document.title).to eq(valid_attributes[:title])
          expect(document.slug).to eq('document-title-1')
        end
      end
    end

    context "with invalid params" do
      it 'invalid_attributes return http success' do
        post :create, params: { document: invalid_attributes }
        expect(response).to have_http_status(:success)
      end

      it 'invalid_attributes do not create a document' do
        expect do
          post :create, params: { document: invalid_attributes }
        end.not_to change(Document, :count)
      end
    end
  end

  describe "GET edit" do
    before do
      get :edit, params: { id: document.id }
    end
    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end
    it "should render the form elements" do
      expect(page).to have_field('Title', with: document.title)
    end
  end

  describe "PUT update" do
    context "with valid params" do
      before do
        put :update, params: { id: document.id, document: valid_attributes }
      end

      it "redirects to updated document" do
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(admin_document_path(document))
      end

      it 'should update document' do
        document.reload

        expect(document.title).to eq(valid_attributes[:title])
      end
    end

    context "with invalid params" do
      it 'invalid_attributes return http success' do
        put :update, params: { id: document.id, document: invalid_attributes }
        expect(response).to have_http_status(:success)
      end

      it 'invalid_attributes does not change document' do
        expect do
          put :update, params: { id: document.id, document: invalid_attributes }
        end.not_to change { document.reload.title }
      end
    end
  end

  describe "GET show" do
    before do
      get :show, params: { id: document.id }
    end
    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end
    it "should render the form elements" do
      expect(page).to have_content(document.title)
      expect(page).to have_content(document.content)
      expect(page).to have_content(document.short_content)
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested document" do
      expect {
        delete :destroy, params: { id: document.id }
      }.to change(Document, :count).by(-1)
    end

    it "redirects to the field" do
      delete :destroy, params: { id: document.id }
      expect(response).to redirect_to(admin_documents_path)
    end
  end
end