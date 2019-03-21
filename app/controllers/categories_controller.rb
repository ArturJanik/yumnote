class CategoriesController < ApiController
  before_action :require_login

  def index
    categories = Category.all_with_basic_data
    render json: { categories: categories }
  end
end
