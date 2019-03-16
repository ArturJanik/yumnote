
FactoryBot.define do
  factory :foodnote do
    amount { '10,2' }
    creation_date { '20190311' }
    association(:user)
    association(:product)
  end

  factory :other_foodnote, class: Foodnote do
    amount { '5.7' }
    creation_date { '20190310' }
    association(:user)
    association(:product)
  end
end