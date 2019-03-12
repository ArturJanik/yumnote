require 'faker'

AdminUser.destroy_all
Product.destroy_all

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
u1 = User.create!(username: 'admin', email: 'admin@example.com', password: 'password', time_zone: 'Europe/Warsaw')
u2 = User.create!(username: 'user', email: 'user@example.com', password: 'password', time_zone: 'America/New_York')

puts "#{User.count} users created!"

c1 = Category.create!(name: 'Dairy, Cheese & Eggs')
c2 = Category.create!(name: 'Fruits & Vegetables')
c3 = Category.create!(name: 'Bread & Bakery')
c4 = Category.create!(name: 'Sugar & Sweets')
c5 = Category.create!(name: 'Meat, Poultry & Fish')
c6 = Category.create!(name: 'Salty Snacks')
c7 = Category.create!(name: 'Fats')
c8 = Category.create!(name: 'Grains & Pasta')
c9 = Category.create!(name: 'Beverages')

Category.create!(name: 'Cheese', parent: c1)
Category.create!(name: 'Eggs', parent: c1)
Category.create!(name: 'Milk & Milk Desserts', parent: c1)
Category.create!(name: 'Yoghurt', parent: c1)
Category.create!(name: 'Other', parent: c1)
Category.create!(name: 'Fruits', parent: c2)
Category.create!(name: 'Vegetables', parent: c2)
Category.create!(name: 'Bread & Rolls', parent: c3)
Category.create!(name: 'Cakes', parent: c3)
Category.create!(name: 'Cookies', parent: c3)
Category.create!(name: 'Pastry', parent: c3)
Category.create!(name: 'Other', parent: c3)
Category.create!(name: 'Ice cream', parent: c4)
Category.create!(name: 'Sugar & Substitutes', parent: c4)
Category.create!(name: 'Sweets', parent: c4)
Category.create!(name: 'Other', parent: c4)
Category.create!(name: 'Beef', parent: c5)
Category.create!(name: 'Fish', parent: c5)
Category.create!(name: 'Game', parent: c5)
Category.create!(name: 'Pork', parent: c5)
Category.create!(name: 'Poultry', parent: c5)
Category.create!(name: 'Other', parent: c5)
Category.create!(name: 'Chips & Fries', parent: c6)
Category.create!(name: 'Other', parent: c6)
Category.create!(name: 'Oils', parent: c7)
Category.create!(name: 'Solid Fats', parent: c7)
Category.create!(name: 'Other', parent: c7)
Category.create!(name: 'Breakfast Products', parent: c8)
Category.create!(name: 'Cereal', parent: c8)
Category.create!(name: 'Grains', parent: c8)
Category.create!(name: 'Pasta', parent: c8)
Category.create!(name: 'Other', parent: c8)
Category.create!(name: 'Alcoholic', parent: c9)
Category.create!(name: 'Soft Drinks', parent: c9)
Category.create!(name: 'Tea & Coffee', parent: c9)
Category.create!(name: 'Other', parent: c9)

puts "#{Category.count} categories created!"

75.times do |i|
  Product.create!(name: Faker::Alphanumeric.alpha(10), kcal: Faker::Number.number(3), carb: Faker::Number.number(2), fat: Faker::Number.number(2), prot: Faker::Number.number(2), amount: Faker::Number.number(3), unit: 'g', category: c1)
end
75.times do |i|
  Product.create!(name: Faker::Alphanumeric.alpha(10), kcal: Faker::Number.number(3), carb: Faker::Number.number(2), fat: Faker::Number.number(2), prot: Faker::Number.number(2), amount: 1, unit: 'g', category: c1)
end

puts "#{Product.count} products created!"

30.times do |i|
  x = 30-i
  20.times do |j|
    Foodnote.create!(product: Product.find_by(id: rand(150)+1), user: u1, amount: 10, creation_date: Time.zone.today - (x).days)
    Foodnote.create!(product: Product.find_by(id: rand(150)+1), user: u2, amount: 10, creation_date: Time.zone.today - (x).days)
  end
end

puts "#{Foodnote.count} foodnotes created!"