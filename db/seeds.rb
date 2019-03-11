require 'faker'

AdminUser.destroy_all
Product.destroy_all

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
u1 = User.create!(username: 'admin', email: 'admin@example.com', password: 'password', time_zone: 'Europe/Warsaw')
u2 = User.create!(username: 'user', email: 'user@example.com', password: 'password', time_zone: 'Europe/Warsaw')

puts "#{User.count} users created!"

c1 = Category.create!(name: 'Dairy, Cheese & Eggs')
c2 = Category.create!(name: 'Fruits & Vegetables')
c3 = Category.create!(name: 'Bread & Bakery')

puts "#{Category.count} categories created!"

150.times do |i|
  Product.create!(name: Faker::Alphanumeric.alpha(10), kcal: Faker::Number.number(3), carb: Faker::Number.number(2), fat: Faker::Number.number(2), prot: Faker::Number.number(2), amount: Faker::Number.number(3), unit: 'g', category: c1)
end
150.times do |i|
  Product.create!(name: Faker::Alphanumeric.alpha(10), kcal: Faker::Number.number(3), carb: Faker::Number.number(2), fat: Faker::Number.number(2), prot: Faker::Number.number(2), amount: 1, unit: 'g', category: c1)
end

puts "#{Product.count} products created!"

365.times do |i|
  x = 365-i
  20.times do |j|
    Foodnote.create!(product: Product.find_by(id: rand(300)+1), user: u1, amount: 10, created_at: Time.zone.today - (x).days)
  end
end

puts "#{Foodnote.count} foodnotes created!"