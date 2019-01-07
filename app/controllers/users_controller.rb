class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.new(user_params)
    if user.save
      render json: { token: user.auth_token, username: user.username }
    else
      render json: { errors: { details: user.errors } }, status: 422
    end
  end

  def profile
    user = User.find_by_username(params[:username])
    if user
      user_articles = user.articles
      render json: {
        user: {
          username: user.username
        },
        articles: user_articles
      }
    else
      render json: { errors: { details: user.errors } }, status: 404
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end