
FactoryBot.define do
  factory :foodnote do
    amount { '10,2' }
    creation_date { '20190311' }
    association(:user)
    association(:product)
  end
end