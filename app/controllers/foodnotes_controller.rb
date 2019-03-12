class FoodnotesController < ApiController
  before_action :require_login
  around_action :use_current_user_timezone, only: [:index, :yesterday, :create], if: :current_user
  
  def index
    foodnotes = current_user.foodnotes.from_today.select([:id, :product_id, :amount]).with_products
    render json: foodnotes, each_serializer: FoodnoteSerializer
  end
  
  def yesterday
    foodnotes = current_user.foodnotes.from_yesterday.select([:id, :product_id, :amount]).with_products
    render json: foodnotes, each_serializer: FoodnoteSerializer
  end

  def show
    date = Date.parse(params[:day])
    foodnotes = current_user.foodnotes.from_day(date).select([:id, :product_id, :amount]).with_products
    render json: foodnotes, each_serializer: FoodnoteSerializer
  end

  def create
    foodnote = current_user.foodnotes.new(foodnote_params)
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
    foodnote = current_user.foodnotes.find(params['id'])
    
    if foodnote.update(foodnote_params)
      render json: {
        message: 'ok'
      }
    else
      render json: { errors: foodnote.errors }, status: 400
    end
  end

  def destroy
    foodnote = current_user.foodnotes.find(params['id'])

    if foodnote.destroy
      render json: {}, status: 200
    else
      errors = { errors: { foodnote: ['Not found']}}
      render json: errors, status: 404
    end
  end

  def statistics
    foodnotes = current_user.foodnotes.from_last_year
    render json: foodnotes, each_serializer: FoodnoteStatisticsSerializer
  end

  private
  def foodnote_params
    params.require(:foodnote).permit(:amount, :creation_date, :product, :user, :product_id)
  end

  def use_current_user_timezone &block
    Time.use_zone(current_user.time_zone, &block)
  end
end