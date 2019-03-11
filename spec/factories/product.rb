require 'faker'

FactoryBot.define do
  factory :product do
    name Faker::Alphanumeric.alpha(10)
    kcal Faker::Number.number(3)
    carb Faker::Number.number(2)
    fat Faker::Number.number(2)
    prot Faker::Number.number(2) 
    amount 1
    unit 'g'
    association(:category)
  end
end