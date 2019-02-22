class Document < ApplicationRecord
  validates_uniqueness_of :title
  validates_presence_of :title, :content, :short_content
  validates :slug, uniqueness: true
end
