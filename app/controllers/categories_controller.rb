class CategoriesController < ApiController
  before_action :require_login

  def index
    categories = Category.all_with_basic_data
    render json: { categories: categories }
  end

  def selectable
    categories = Category.all_with_select_data
    render json: { categories: categories }
  end
end
