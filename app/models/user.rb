class User < ApplicationRecord
  validates_uniqueness_of :username, :email

  validates :username, length: { minimum: 4 }
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create }

  has_secure_password validations: false
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates_presence_of :password, :email, :username, on: :create
  has_secure_token :auth_token
  
  has_many :products

  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_login(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end
end
