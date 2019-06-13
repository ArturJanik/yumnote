require 'rails_helper'

describe Admin::AdminUsersController, type: :controller do
  # required to check rendered content
  render_views

  let(:page) { Capybara::Node::Simple.new(response.body) }
  let!(:user) { create(:admin) }
  before { sign_in user }

  let!(:document) { create(:admin_document) }

  let(:valid_attributes) { attributes_for(:admin) }
  let(:invalid_attributes) { { email: '' } }

  describe "GET index" do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
    it 'should render admin users list' do
      get :index
      expect(page).to have_css("form[action='/admin/admin_users/batch_action']")
      expect(page).to have_xpath("//a[@href='/admin/admin_users/new']")
    end
  end

  describe "GET new" do
    it 'returns http success' do
      get :new
      expect(response).to have_http_status(:success)
    end
    it 'should render new admin user form' do
      get :new
      expect(page).to have_css("form[action='/admin/admin_users']")
    end
  end
end