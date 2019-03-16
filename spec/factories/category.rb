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
end