require 'rails_helper'

describe Admin::CategoriesController, type: :controller do
  # required to check rendered content
  render_views

  let(:page) { Capybara::Node::Simple.new(response.body) }
  let!(:user) { create(:admin) }
  before { sign_in user }

  let!(:category) { create(:admin_category) }

  let(:valid_attributes) { attributes_for(:category) }
  let(:invalid_attributes) { { name: '' } }

  describe "GET index" do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
    it 'should render category list' do
      get :index
      expect(page).to have_css("form[action='/admin/categories/batch_action']")
      expect(page).to have_xpath("//a[@href='/admin/categories/new']")
    end
  end

  describe "GET new" do
    it 'returns http success' do
      get :new
      expect(response).to have_http_status(:success)
    end
    it 'should render new category form' do
      get :new
      expect(page).to have_css("form[action='/admin/categories']")
    end
  end

  describe "POST create" do
    context "with valid params" do
      it 'creates a new Category' do
        expect {
          post :create, params: { category: valid_attributes }
        }.to change(Category, :count).by(1)
      end

      it "redirects to the created category" do
        post :create, params: { category: valid_attributes }
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(admin_category_path(Category.last))
      end

      it 'should create category' do
        post :create, params: { category: valid_attributes }
        category = Category.last

        expect(category.name).to eq(valid_attributes[:name])
        expect(category.slug).to eq('dairy-cheese-eggs')
      end

      context "with duplicate name" do
        it 'should generate unique slug' do
          2.times do post :create, params: { category: valid_attributes } end
          category = Category.last

          expect(category.name).to eq(valid_attributes[:name])
          expect(category.slug).to eq('dairy-cheese-eggs-1')
        end
      end
    end

    context "with invalid params" do
      it 'invalid_attributes return http success' do
        post :create, params: { category: invalid_attributes }
        expect(response).to have_http_status(:success)
      end

      it 'invalid_attributes do not create a category' do
        expect do
          post :create, params: { category: invalid_attributes }
        end.not_to change(Category, :count)
      end
    end
  end

  describe "GET edit" do
    before do
      get :edit, params: { id: category.id }
    end
    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end
    it "should render the form elements" do
      expect(page).to have_field('Name', with: category.name)
    end
  end

  describe "PUT update" do
    context "with valid params" do
      before do
        put :update, params: { id: category.id, category: valid_attributes }
      end

      it "redirects to updated category" do
        expect(response).to have_http_status(:redirect)
        expect(response).to redirect_to(admin_category_path(category))
      end

      it 'should update category' do
        category.reload

        expect(category.name).to eq(valid_attributes[:name])
      end
    end

    context "with invalid params" do
      it 'invalid_attributes return http success' do
        put :update, params: { id: category.id, category: invalid_attributes }
        expect(response).to have_http_status(:success)
      end

      it 'invalid_attributes does not change category' do
        expect do
          put :update, params: { id: category.id, category: invalid_attributes }
        end.not_to change { category.reload.name }
      end
    end
  end

  describe "GET show" do
    before do
      get :show, params: { id: category.id }
    end
    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end
    it "should render the form elements" do
      expect(page).to have_content(category.name)
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested category" do
      expect {
        delete :destroy, params: { id: category.id }
      }.to change(Category, :count).by(-1)
    end

    it "redirects to the field" do
      delete :destroy, params: { id: category.id }
      expect(response).to redirect_to(admin_categories_path)
    end
  end
end