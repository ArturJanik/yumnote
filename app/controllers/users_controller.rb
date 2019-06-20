class UsersController < ApiController
  before_action :require_login, except: [:create, :confirm, :fraud]

  def create
    user = User.new(user_params)
    if user.save
      user.generate_signup_token
      UserMailer.send_signup_confirmation(user).deliver_now
      render json: { token: user.auth_token, username: user.username, timezone: user.time_zone }
    else
      render json: { errors: user.errors }, status: 422
    end
  end

  def update
    if current_user.update(user_params)
      render json: {
        message: 'ok',
        timezone: user_params[:time_zone]
      }
    else
      render json: { errors: 'Error: you may not change this value.' }, status: 400
    end
  end

  def changepassword
    if current_user.authenticate(user_params[:password])
      if current_user.reset_password(user_params[:new_password])
        render json: {
          message: 'Password changed successfully.'
        }
      end
    else
      render json: { errors: { password: 'Old password incorrect' }}, status: 400
    end
  end

  def confirm
    signup_token = params[:token].to_s

    if signup_token.blank?
      return render json: { error: 'Token not received.' }, status: 400
    end

    user = User.find_by(signup_confirmation_token: signup_token)

    if user.present?
      if user.confirm_account
        render json: { message: 'User account confirmed.' }
      end
    else
      render json: { error: 'Token incorrect or does not exist.' }, status: 400
    end
  end

  def fraud
    signup_token = params[:token].to_s

    if signup_token.blank?
      return render json: { error: 'Token not received.' }, status: 400
    end

    user = User.find_by(signup_confirmation_token: signup_token)

    if user.present?
      if user.block_account
        render json: { message: 'Fraud user has been blocked.' }
      end
    else
      render json: { error: 'Token incorrect or does not exist.' }, status: 400
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
    params.require(:user).permit(:username, :email, :password, :new_password, :time_zone, :signup_confirmed)
  end
end