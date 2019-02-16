AdminUser.destroy_all
Product.destroy_all

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
u1 = User.create!(username: 'admin', email: 'admin@example.com', password: 'password', time_zone: 'Warsaw')
u2 = User.create!(username: 'user', email: 'user@example.com', password: 'password', time_zone: 'Warsaw')

puts "#{User.count} users created!"

c1 = Category.create!(name: 'Dairy, Cheese & Eggs')

puts "#{Category.count} categories created!"

p1 = Product.create!(name: 'Milk 3.2%', kcal: 100, carb: 10, fat: 10, prot: 10, amount: 100, unit: 'ml', category: c1)
p2 = Product.create!(name: 'Milk 2%', kcal: 200, carb: 20, fat: 20, prot: 20, amount: 100, unit: 'g', category: c1)
p3 = Product.create!(name: 'Milk 0.5%', kcal: 300, carb: 30, fat: 30, prot: 30, amount: 100, unit: 'g', category: c1)
p4 = Product.create!(name: 'Milk 0%', kcal: 400, carb: 40, fat: 40, prot: 40, amount: 100, unit: 'ml', category: c1)
p5 = Product.create!(name: 'Not a damn milk', kcal: 500, carb: 50, fat: 50, prot: 50, amount: 100, unit: 'pc', category: c1, user: u1)

puts "#{Product.count} products created!"

f1 = Foodnote.create!(product: p1, user: u1, amount: 11)
f2 = Foodnote.create!(product: p2, user: u1, amount: 22)
f3 = Foodnote.create!(product: p3, user: u1, amount: 33)
f4 = Foodnote.create!(product: p2, user: u2, amount: 44)
f5 = Foodnote.create!(product: p4, user: u2, amount: 55)
f6 = Foodnote.create!(product: p5, user: u1, amount: 66, created_at: Time.zone.yesterday.beginning_of_day)

puts "#{Foodnote.count} foodnotes created!"