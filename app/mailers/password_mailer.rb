class PasswordMailer < ApplicationMailer
  def send_password_reset(user)
    # mail(to: user.email, subject: 'Welcome to My Awesome Site')
    mail(to: 'natenczasw@o2.pl', subject: 'Welcome to My Awesome Site')
  end
end
