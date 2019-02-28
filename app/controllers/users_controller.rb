class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.new(user_params)
    if user.save
      render json: { token: user.auth_token, username: user.username }
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def update
    if current_user.update(user_params)
      render json: {
        message: 'ok'
      }
    else
      render json: { errors: 'Error: you may not change this value.' }, status: 400
    end
  end

  def profile
    user = {
      id: current_user.id,
      username: current_user.username,
      email: current_user.email,
      time_zone: current_user.time_zone,
    }

    render json: { user: user }
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :time_zone)
  end
end