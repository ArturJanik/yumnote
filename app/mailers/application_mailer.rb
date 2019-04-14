class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@calories.today'
  layout 'mailer'
end
