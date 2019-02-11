class Product < ApplicationRecord
  validates :name, :kcal, :category_id, presence: true

  validates_uniqueness_of :name
  validates_presence_of :name

  validates :name, length: { minimum: 2 }
  validates :kcal, numericality: { greater_than_or_equal_to: 0 }
  
  belongs_to :category
  belongs_to :user, optional: true
end
