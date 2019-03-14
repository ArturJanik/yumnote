class ProductsController < ApiController
  before_action :require_login
  
  def index
    products = Category.find(params[:category_id]).products.where(user: current_user).or(Category.find(params[:category_id]).products.public_products)
    if products
      render json: { products: products }
    else
      errors = { errors: { products: ['Not found']}}
      render json: errors, status: 404
    end
  end

  def userproducts
    products = current_user.products
    render json: products, each_serializer: UserProductSerializer
  end

  def latest
    start_date = (Time.zone.today - 7.days).beginning_of_day
    end_date = Time.zone.yesterday.end_of_day

    foodnotes = current_user.foodnotes.created_between(start_date, end_date).with_products
    products = foodnotes.map {|note| note.product}.uniq

    render json: { products: products }
  end

  def show
    product = current_user.products.form_data_only.find(params['id'])

    if product
      render json: { product: product }
    else
      errors = { errors: { product: ['Not found']}}
      render json: errors, status: 404
    end
  end

  def create
    product = current_user.products.new(product_params)
    
    if product.save
      render json: {
        message: 'ok',
        product: product
      }
    else
      render json: { errors: product.errors }, status: 400
    end
  end

  def update
    product = current_user.products.find(params['id'])

    if product.update(product_params)
      render json: {
        message: 'ok',
        product: product
      }
    else
      render json: { errors: product.errors }, status: 400
    end
  end

  def destroy
    product = current_user.products.find(params['id'])

    product.user = nil
    if product.save
      render json: {}, status: 200
    else
      render json: { errors: product.errors }, status: 400
    end
  end

  def toggle_visibility
    product = current_user.products.find(params['id'])

    product.toggle(:visible)
    
    if product.save
      render json: {
        message: 'ok'
      }
    else
      render json: { errors: product.errors }, status: 400
    end
  end

  private
  def product_params
    params.require(:product).permit(:name, :kcal, :carb, :fat, :prot, :amount, :unit, :visible, :category_id, :user_id)
  end
end