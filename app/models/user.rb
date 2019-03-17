class User < ApplicationRecord
  before_save { self.email = email.downcase if attribute_present? 'email' }
  
  has_many :products
  has_many :foodnotes
  
  validates_presence_of :password, :email, :username, :time_zone, on: :create
  validates_uniqueness_of :username, :email
  validates :username, length: { minimum: 4, maximum: 50 }
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, on: :create },
                    uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :time_zone, inclusion: { in: TZInfo::Timezone.all.map(&:name), on: [:create, :update]}
  has_secure_password validations: false
  has_secure_token :auth_token

  def reset_password(password)
    self.reset_password_token = nil
    self.password = password
    save!
  end
  
  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  def self.validate_login(email, password)
    user = find_by(email: email)
    if user && user.authenticate(password)
      user
    end
  end

  def generate_password_token
    self.reset_password_token = generate_token
    self.reset_password_sent_at = Time.zone.now.utc
    save!
  end

  def password_token_valid?
    (self.reset_password_sent_at + 4.hours) > Time.zone.now.utc
  end

  private
  def generate_token
    SecureRandom.hex(10)
  end
end
