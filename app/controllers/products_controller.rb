class ProductsController < ApiController
  before_action :require_login
  
  def index
    products = Category.find(params[:category_id]).products
    if products
      render json: { products: products }
    else
      errors = { errors: { products: ['Not found']}}
      render json: errors, status: 404
    end
  end

  def userproducts
    products = current_user.products
    render json: { products: products }
  end

  def latest
    start_date = (Time.zone.now - 7.days).beginning_of_day
    end_date = (Time.zone.now - 7.days).end_of_day
    products = current_user.foodnotes.created_between(start_date, end_date)
    render json: { products: products }
  end

  # def show
  #   product = Product.find_by id: params[:id]
  #   if product
  #     render json: { product: product }
  #   else
  #     errors = { errors: { product: ['Not found']}}
  #     render json: errors, status: 404
  #   end
  # end

  # def create
  #   product = Product.new(product_params)
    
  #   if product.save
  #     render json: {
  #       message: 'ok',
  #       product: product
  #     }
  #   else
  #     render json: { errors: product.errors }, status: 400
  #   end
  # end

  # def update
  #   product = Product.find(params['id'])

  #   if product.update(product_params)
  #     render json: {
  #       message: 'ok'
  #     }
  #   else
  #     render json: { errors: product.errors }, status: 400
  #   end
  # end

  # def destroy
  #   product = Product.find(params['id'])
    
  #   if product
  #     product.destroy
  #     render json: {}, status: 200
  #   else
  #     errors = { errors: { product: ['Not found']}}
  #     render json: errors, status: 404
  #   end
  # end

  private
  def product_params
    params.require(:product).permit(:name, :kcal, :carb, :fat, :prot, :amount, :unit, :visible, :category, :user)
  end
end