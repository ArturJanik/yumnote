require 'faker'

FactoryBot.define do
  factory :user do
    for_valid
    
    trait :for_valid do
      username { Faker::Internet.username(8) }
      email { Faker::Internet.email }
      password { 'password' }
      time_zone { 'Europe/Warsaw' }
    end

    trait :for_invalid do
      username { Faker::Internet.username(3) }
      email { 'invalid@email' }
      password { Faker::Internet.password(5) }
      time_zone { nil }
    end
  end
end