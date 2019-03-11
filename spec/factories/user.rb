require 'faker'

FactoryBot.define do
  factory :user do
    username Faker::Alphanumeric.alpha(10)
    sequence(:email) { |i| "dummy.user-#{i}@gmail.com" }
    password 'password'
    time_zone 'Europe/Warsaw'
  end
end