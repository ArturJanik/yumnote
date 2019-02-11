class Category < ApplicationRecord
  has_many :subcategories, class_name: "Category", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Category", optional: true
  has_many :products
  
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }
end