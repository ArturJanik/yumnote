class UserMailer < ApplicationMailer
  def send_signup_confirmation(user)
    @user = user
    mail(to: @user.email, subject: 'Signup confirmation - calories.today')
  end
end