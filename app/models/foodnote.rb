class Foodnote < ApplicationRecord
  belongs_to :product
  belongs_to :user
  
  validates :user_id, :product_id, :amount, presence: true
  validates :user_id, numericality: { greater_than_or_equal_to: 0 }
  validates_associated :user
  validates :product_id, numericality: { greater_than_or_equal_to: 0 }
  validates_associated :product
  validates :amount, numericality: { greater_than: 0 }

  #  Podczas przypisywania wartości do zmiennej amount trzeba sprawdzić czy wartość jest przesyłana z przecinkiem czy kropką i ją ujednolicić
    def amount=(val)
      str_val = val.to_s
      str_val.sub!(',', '.')
      self['amount'] = val
    end
end
