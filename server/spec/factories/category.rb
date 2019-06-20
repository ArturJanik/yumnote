require 'faker'

FactoryBot.define do
  factory :category do
    name { 'Dairy, Cheese & Eggs' }
    parent
  end

  factory :secondcategory, class: Category do
    name { 'Dairy, Cheese & Eggs' }
  end

  factory :parent, class: Category do
    name { 'Parent category' }
  end

  factory :product_category, class: Category do
    name { Faker::Alphanumeric.alpha(10) }
  end

  factory :admin_category, class: Category do
    name { Faker::Alphanumeric.alpha(10) }
  end
end