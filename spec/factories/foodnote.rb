
FactoryBot.define do
  factory :foodnote do
    amount { 10 }
    created_at { Time.zone.today.beginning_of_day }
    association(:user)
    association(:product)
  end
end