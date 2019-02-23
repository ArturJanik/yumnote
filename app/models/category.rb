class Category < ApplicationRecord
  before_create :generate_slug

  has_many :subcategories, class_name: "Category", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Category", optional: true
  has_many :products
  
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }, uniqueness: true
  validates :slug, uniqueness: true

  scope :all_with_basic_data, -> { where(active: true).select("categories.id, categories.name, categories.slug, categories.parent_id").order(parent_id: :desc, name: :asc) }

  private
  def generate_slug
    self.slug = self.name.parameterize

    i = 1
    loop do
      if Category.where(slug: slug).exists?
        self.slug = self.name.parameterize + "-#{i}"
        i+=1
      else
        break
      end
    end
  end
end