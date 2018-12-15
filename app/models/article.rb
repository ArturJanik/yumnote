class Article < ApplicationRecord
  validates_uniqueness_of :title, :description, :content
  validates_presence_of :title, :description, :content
end
