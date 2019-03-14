class Product < ApplicationRecord
  before_create :validate_privacy
  before_save :convert_values

  validates :name, :kcal, :category_id, presence: true

  validates_uniqueness_of :name, unless: :product_name_unique_to_creator
  validates_presence_of :name

  validates :name, length: { minimum: 2 }
  validates :kcal, numericality: { greater_than_or_equal_to: 0 }
  validates :carb, numericality: { greater_than_or_equal_to: 0 }
  validates :fat, numericality: { greater_than_or_equal_to: 0 }
  validates :prot, numericality: { greater_than_or_equal_to: 0 }
  validates :amount, numericality: { greater_than_or_equal_to: 1 }
  
  has_many :foodnotes
  belongs_to :category
  belongs_to :user, optional: true

  scope :public_products, -> { where(private: false) }
  scope :form_data_only, -> { select("id, name, kcal, carb, fat, prot, amount, unit, category_id, user_id") }

  private
  def convert_values
    divider = self.amount
    self.kcal = self.kcal / divider
    self.carb = self.carb / divider
    self.fat = self.fat / divider
    self.prot = self.prot / divider
    self.amount = self.amount / divider
  end

  def product_name_unique_to_creator
    if self.user
      unique = !self.name_changed? || !(self.user.products.find_by name: self.name)
    else
      unique = !(Product.where('user = nil && name = ?', self.name))
    end
    unique
  end

  def validate_privacy
    self.private = self.user_id.present?
  end
end
