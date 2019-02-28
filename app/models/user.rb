class User < ApplicationRecord
  before_save { self.email = email.downcase }
  
  has_many :products
  has_many :foodnotes
  
  validates_presence_of :password, :email, :username, :time_zone, on: :create
  validates_uniqueness_of :username, :email
  validates :username, length: { minimum: 4, maximum: 50 }
  validates :email, presence: true, 
                    format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create },
                    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :time_zone, inclusion: { in: TZInfo::Timezone.all.map(&:name), on: :create }
  has_secure_password validations: false
  has_secure_token :auth_token
  
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
