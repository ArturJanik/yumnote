AdminUser.destroy_all
Product.destroy_all

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
u1 = User.create!(username: 'admin', email: 'admin@example.com', password: 'password', time_zone: 'Warsaw')

puts "#{User.count} users created!"

c1 = Category.create!(name: 'Dairy, Cheese & Eggs')

puts "#{Category.count} categories created!"

p1 = Product.create!(name: 'Milk 3.2%', kcal: 100, amount: 1, category: c1)
p2 = Product.create!(name: 'Milk 2%', kcal: 100, amount: 1, category: c1)
p3 = Product.create!(name: 'Milk 0.5%', kcal: 100, amount: 1, category: c1)
p4 = Product.create!(name: 'Milk 0%', kcal: 100, amount: 1, category: c1)
p5 = Product.create!(name: 'Not a damn milk', kcal: 100, amount: 1, category: c1, user: u1)

puts "#{Product.count} products created!"