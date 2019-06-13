require 'rails_helper'

describe Admin::DashboardController, type: :controller do
  render_views

  let!(:user) { create(:admin) }
  let(:page) { Capybara::Node::Simple.new(response.body) }

  before(:each) { sign_in user }

  it 'renders the index page' do
    get :index
    expect(page).to have_content('Dashboard')
    expect(page).not_to have_content('draobhsaD')
  end
end