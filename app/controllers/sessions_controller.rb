class SessionsController < ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    if user = User.validate_login(params[:user][:email], params[:user][:password])
      allow_token_to_be_used_only_once_for(user)
      send_token_for_valid_login_of(user)
    else
      render_unauthorized(["Incorrect login or password"])
    end
  end

  def destroy
    logout
    head :ok
  end

  private

  def send_token_for_valid_login_of(user)
    render json: { token: user.auth_token, username: user.username }
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_auth_token
  end

  def logout
    current_user.invalidate_token
  end
end
