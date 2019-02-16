class Product < ApplicationRecord
  validates :name, :kcal, :category_id, presence: true

  validates_uniqueness_of :name
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
end
