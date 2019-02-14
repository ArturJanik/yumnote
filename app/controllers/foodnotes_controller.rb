class FoodnotesController < ApiController
  before_action :require_login
  
  def index
    foodnotes = Foodnote.all
    render json: { foodnotes: foodnotes }
  end

  # def show
  #   foodnote = Foodnote.find_by id: params[:id]
  #   if foodnote
  #     render json: { foodnote: foodnote }
  #   else
  #     errors = { errors: { foodnote: ['Not found']}}
  #     render json: errors, status: 404
  #   end
  # end

  # def create
  #   foodnote = Foodnote.new(foodnote_params)
  #   foodnote.user = current_user
    
  #   if promo.save
  #     render json: {
  #       message: 'ok',
  #       foodnote: foodnote
  #     }
  #   else
  #     render json: { errors: foodnote.errors }, status: 400
  #   end
  # end

  # def update
  #   foodnote = Foodnote.find(params['id'])

  #   if foodnote.update(foodnote_params)
  #     render json: {
  #       message: 'ok'
  #     }
  #   else
  #     render json: { errors: foodnote.errors }, status: 400
  #   end
  # end

  # def destroy
  #   foodnote = Foodnote.find(params['id'])
    
  #   if foodnote
  #     foodnote.destroy
  #     render json: {}, status: 200
  #   else
  #     errors = { errors: { foodnote: ['Not found']}}
  #     render json: errors, status: 404
  #   end
  # end

  private
  def foodnote_params
    params.require(:foodnote).permit(:amount, :created_at, :product, :user)
  end
end