class Product < ApplicationRecord
  before_save :convert_values
  before_create :validate_privacy

  validates :name, :kcal, :category_id, presence: true

  validates_uniqueness_of :name, unless: :product_name_unique_to_creator, case_sensitive: false

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

  def kcal=(val)
    str_val = val.to_s.sub(',', '.')
    self['kcal'] = str_val
  end
  def carb=(val)
    str_val = val.to_s.sub(',', '.')
    self['carb'] = str_val
  end
  def fat=(val)
    str_val = val.to_s.sub(',', '.')
    self['fat'] = str_val
  end
  def prot=(val)
    str_val = val.to_s.sub(',', '.')
    self['prot'] = str_val
  end
  def amount=(val)
    str_val = val.to_s.sub(',', '.')
    self['amount'] = str_val
  end

  private
  def convert_values
    divider = amount
    self.kcal = (kcal / divider).round(2)
    self.carb = (carb / divider).round(2)
    self.fat = (fat / divider).round(2)
    self.prot = (prot / divider).round(2)
    self.amount = 1
  end

  def product_name_unique_to_creator
    if self.user
      unique = (!self.id_changed? && !self.name_changed?) || !(self.user.products.find_by name: self.name)
    else
      unique = (!self.id_changed? && !self.name_changed?) || !(Product.where('user = nil && name = ?', self.name))
    end
    unique
  end

  def validate_privacy
    self.private = self.user_id.present?
  end
end
