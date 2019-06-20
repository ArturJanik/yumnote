require 'faker'

AdminUser.destroy_all
Product.destroy_all

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
# u1 = User.create!(username: 'admin', email: 'admin@example.com', password: 'password', time_zone: 'Europe/Warsaw')
# u2 = User.create!(username: 'user', email: 'user@example.com', password: 'password', time_zone: 'America/New_York')
User.create!(username: 'user', email: 'user@example.com', password: 'password', time_zone: 'Europe/Warsaw')

puts "#{User.count} users created!"

c1 = Category.create!(id: 100, name: 'Dairy, Cheese & Eggs')
c2 = Category.create!(id: 120, name: 'Fruits, Vegetables & Legumes')
c3 = Category.create!(id: 140, name: 'Bread & Bakery')
c4 = Category.create!(id: 160, name: 'Fastfoods, Dishes & Soups')
c5 = Category.create!(id: 180, name: 'Nuts & Seeds')
c6 = Category.create!(id: 200, name: 'Sugar & Sweets')
c7 = Category.create!(id: 220, name: 'Meat, Poultry & Fish')
c8 = Category.create!(id: 240, name: 'Salty Snacks')
c9 = Category.create!(id: 260, name: 'Fats')
c10 = Category.create!(id: 280, name: 'Grains, Flour, Rice & Pasta')
c11 = Category.create!(id: 300, name: 'Beverages')

Category.create!(id: 101, name: 'Milk & Milk Desserts', parent: c1)
Category.create!(id: 102, name: 'Cheese & Cream', parent: c1)
Category.create!(id: 103, name: 'Eggs', parent: c1)
Category.create!(id: 104, name: 'Yoghurt', parent: c1)
Category.create!(id: 105, name: 'Dairy, Cheese & Eggs - Other', parent: c1)

Category.create!(id: 121, name: 'Fruits', parent: c2)
Category.create!(id: 122, name: 'Processed Fruits & Juices', parent: c2)
Category.create!(id: 123, name: 'Vegetables', parent: c2)
Category.create!(id: 124, name: 'Processed Vegetables & Juices', parent: c2)
Category.create!(id: 125, name: 'Legumes', parent: c2)
Category.create!(id: 126, name: 'Salads', parent: c2)
Category.create!(id: 127, name: 'Spices & Herbs', parent: c2)
Category.create!(id: 128, name: 'Fungi', parent: c2)
Category.create!(id: 129, name: 'Tofu & Other Soy Products', parent: c2)
Category.create!(id: 130, name: 'Fruits, Vegetables & Legumes - Other', parent: c2)

Category.create!(id: 141, name: 'Bread & Rolls', parent: c3)
Category.create!(id: 142, name: 'Cakes', parent: c3)
Category.create!(id: 143, name: 'Cupcakes & Muffins', parent: c3)
Category.create!(id: 144, name: 'Pastries', parent: c3)
Category.create!(id: 145, name: 'Pies', parent: c3)
Category.create!(id: 146, name: 'Bread & Bakery - Other', parent: c3)

Category.create!(id: 161, name: 'Fastfoods & Pizza', parent: c4)
Category.create!(id: 162, name: 'Dishes', parent: c4)
Category.create!(id: 163, name: 'Soups', parent: c4)
Category.create!(id: 164, name: 'Fastfoods, Dishes & Soups - Other', parent: c4)

Category.create!(id: 181, name: 'Nuts & Nut Products', parent: c5)
Category.create!(id: 182, name: 'Seeds & Seed Products', parent: c5)
Category.create!(id: 183, name: 'Nuts & Seeds - Other', parent: c5)

Category.create!(id: 201, name: 'Candy Bars', parent: c6)
Category.create!(id: 202, name: 'Chocolate', parent: c6)
Category.create!(id: 203, name: 'Cookies & Crackers', parent: c6)
Category.create!(id: 204, name: 'Desserts', parent: c6)
Category.create!(id: 205, name: 'Honey & Syrups', parent: c6)
Category.create!(id: 206, name: 'Ice cream', parent: c6)
Category.create!(id: 207, name: 'Sugar & Substitutes', parent: c6)
Category.create!(id: 208, name: 'Sweets', parent: c6)
Category.create!(id: 209, name: 'Jams & Sweet Spreads', parent: c6)
Category.create!(id: 210, name: 'Sugar & Sweets - Other', parent: c6)

Category.create!(id: 221, name: 'Beef', parent: c7)
Category.create!(id: 222, name: 'Fish', parent: c7)
Category.create!(id: 223, name: 'Game', parent: c7)
Category.create!(id: 224, name: 'Pork', parent: c7)
Category.create!(id: 225, name: 'Poultry', parent: c7)
Category.create!(id: 226, name: 'Veal & Lamb', parent: c7)
Category.create!(id: 227, name: 'Seafoods', parent: c7)
Category.create!(id: 228, name: 'Processed Meat & Fish', parent: c7)
Category.create!(id: 229, name: 'Meat, Poultry & Fish - Other', parent: c7)

Category.create!(id: 241, name: 'Chips & Fries', parent: c8)
Category.create!(id: 242, name: 'Popcorn & Pretzels', parent: c8)
Category.create!(id: 243, name: 'Salty Snacks - Other', parent: c8)

Category.create!(id: 261, name: 'Oils', parent: c9)
Category.create!(id: 262, name: 'Sauces & Dressings', parent: c9)
Category.create!(id: 263, name: 'Solid Fats', parent: c9)
Category.create!(id: 264, name: 'Fats - Other', parent: c9)

Category.create!(id: 281, name: 'Breakfast Products', parent: c10)
Category.create!(id: 282, name: 'Cereals & Grains', parent: c10)
Category.create!(id: 283, name: 'Flour', parent: c10)
Category.create!(id: 284, name: 'Pasta', parent: c10)
Category.create!(id: 285, name: 'Rice', parent: c10)
Category.create!(id: 286, name: 'Corn', parent: c10)
Category.create!(id: 287, name: 'Grains, Flour, Rice & Pasta - Other', parent: c10)

Category.create!(id: 301, name: 'Alcoholic', parent: c11)
Category.create!(id: 302, name: 'Soft Drinks', parent: c11)
Category.create!(id: 303, name: 'Tea & Coffee', parent: c11)
Category.create!(id: 304, name: 'Beverages - Other', parent: c11)

puts "#{Category.count} categories created!"

# 75.times do |i|
#   Product.create!(name: Faker::Alphanumeric.alpha(10), kcal: Faker::Number.number(3), carb: Faker::Number.number(2), fat: Faker::Number.number(2), prot: Faker::Number.number(2), amount: Faker::Number.number(3), unit: 'g', category: c1)
# end
# 75.times do |i|
#   Product.create!(name: Faker::Alphanumeric.alpha(10), kcal: Faker::Number.number(3), carb: Faker::Number.number(2), fat: Faker::Number.number(2), prot: Faker::Number.number(2), amount: 1, unit: 'g', category: c1)
# end

# puts "#{Product.count} products created!"

# 30.times do |i|
#   x = 30-i
#   20.times do |j|
#     Foodnote.create!(product: Product.find_by(id: rand(150)+1), user: u1, amount: 10, creation_date: Time.zone.today - (x).days)
#     Foodnote.create!(product: Product.find_by(id: rand(150)+1), user: u2, amount: 10, creation_date: Time.zone.today - (x).days)
#   end
# end

# puts "#{Foodnote.count} foodnotes created!"