class PasswordMailer < ApplicationMailer
  def send_password_reset(user)
    @user = user
    mail(to: @user.email, subject: 'Password reset request - calories.today')
  end
end
