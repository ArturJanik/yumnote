class ApiController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
end