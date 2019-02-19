class FoodnotesController < ApiController
  before_action :require_login
  
  def index
    foodnotes = current_user.foodnotes.from_today.select([:id, :product_id, :amount]).with_products
    render json: foodnotes, each_serializer: FoodnoteSerializer
  end
  
  def yesterday
    foodnotes = current_user.foodnotes.from_yesterday.select([:id, :product_id, :amount]).with_products
    render json: foodnotes, each_serializer: FoodnoteSerializer
  end

  def create
    foodnote = Foodnote.new(foodnote_params)
    foodnote.user = current_user
    puts 'Product id:'
    puts params['product_id']
    puts 'Amount:'
    puts params['amount']
    foodnote.product = Product.find(params['product_id'])
    
    if foodnote.save
      render json: {
        message: 'ok',
        foodnote: foodnote
      }
    else
      render json: { errors: foodnote.errors }, status: 400
    end
  end

  def update
    foodnote = Foodnote.find(params['id'])

    if current_user.id != foodnote.user_id
      render json: { errors: 'User not permited to update this foodnote' }, status: 400
    else
      if foodnote.update(foodnote_params)
        render json: {
          message: 'ok'
        }
      else
        render json: { errors: foodnote.errors }, status: 400
      end
    end
  end

  def destroy
    foodnote = Foodnote.find(params['id'])

    if current_user.id != foodnote.user_id
      render json: { errors: 'User not permited to update this foodnote' }, status: 400
    else
      if foodnote
        foodnote.destroy
        render json: {}, status: 200
      else
        errors = { errors: { foodnote: ['Not found']}}
        render json: errors, status: 404
      end
    end
  end

  private
  def foodnote_params
    params.require(:foodnote).permit(:amount, :created_at, :product, :user, :product_id)
  end
end