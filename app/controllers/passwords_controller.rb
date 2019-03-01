class PasswordsController < ApiController

  def forgot
    if params[:email].blank?
      return render json: { error: 'No user email received.' }, status: 403
    end

    email = params[:email]
    user = User.find_by(email: email.downcase)

    if user.present?
      user.generate_password_token
      puts 'aaa'
      render json: { message: 'Email with password reset instructions has been successfully sent.' }
    else
      PasswordMailer.send_password_reset('aaa').deliver_now
      # blokujemy mozliwosc okreslenia czy dany email istnieje w bazie na podstawie zwrotek JSON z bledami z API
      render json: { message: 'Email with password reset instructions has been successfully sent.' }
    end
  end

  def reset
    pass_token = params[:pass_token].to_s
    password = params[:password]

    if pass_token.blank? || password.blank?
      return render json: {error: 'Token or password not received.'}, status: 404
    end

    user = User.find_by(reset_password_token: pass_token)

    if user.present? && user.password_token_valid?
      if user.reset_password(password)
        render json: { message: 'Password has been reset.' }
      else
        render json: { error: user.errors.full_messages }, status: 400
      end
    else
      render json: { error: 'Link not valid or expired. Try generating a new link.' }, status: 404
    end
  end
end
