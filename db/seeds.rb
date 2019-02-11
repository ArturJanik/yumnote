AdminUser.destroy_all
Product.destroy_all

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

a1 = Product.create!(title: 'Title #1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id luctus nisi, sit amet viverra magna. Aliquam finibus, mi ut ullamcorper mattis, lorem tortor blandit turpis, in aliquet diam justo nec velit.', content: '<h1>Sed odio augue, malesuada id elit sit amet, lobortis dignissim urna.</h1><p>Nunc ullamcorper blandit mattis. Nunc at aliquam diam, vitae iaculis sapien. Ut maximus scelerisque tellus, ut vulputate mi placerat et. Vivamus vulputate posuere massa a lacinia. Nunc et ipsum ante. Sed lorem diam, fermentum vitae ipsum ac, gravida viverra urna. Nam sed dolor libero. Nam sed ante eget metus interdum blandit. <strong>Vestibulum</strong> ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed consectetur enim nec lectus dapibus efficitur.</p>')
a2 = Product.create!(title: 'Title title #2', description: 'Morbi faucibus laoreet sem vel accumsan. Nunc justo tortor, porta sed maximus quis, faucibus id quam. Sed eleifend tincidunt elementum.', content: '<h1>Cras ut tellus ut augue dignissim fringilla.</h1><p>Duis feugiat justo quis porttitor vehicula. Sed vehicula maximus elit, sed consequat eros. Duis vel tortor venenatis, tempus neque non, aliquet turpis. Vestibulum nec ipsum blandit, dignissim arcu eu, facilisis ante. Fusce massa orci, dictum a euismod sit amet, gravida nec orci. Quisque vestibulum viverra vehicula. Proin sodales elit et gravida fringilla. Nullam ut efficitur sapien. Aliquam ornare posuere ultrices. Nulla id placerat sem.</p>')
a3 = Product.create!(title: 'Title #3', description: 'Sed vitae massa sit amet arcu posuere sollicitudin ut a dui. Integer congue auctor enim, ut porta purus sagittis ut. Donec volutpat tellus id nisl volutpat eleifend. Aliquam facilisis odio in elementum venenatis. Vestibulum at est a ex volutpat porta.', content: '<h1>Sed odio augue, malesuada id elit sit amet, lobortis dignissim urna.</h1><p>Nunc ullamcorper blandit mattis. Nunc at aliquam diam, vitae iaculis sapien. Ut maximus scelerisque tellus, ut vulputate mi placerat et.</p><h2>Vivamus vulputate posuere massa a lacinia.</h2><p>Nunc et ipsum ante. Sed lorem diam, fermentum vitae ipsum ac, gravida viverra urna. Nam sed dolor libero. Nam sed ante eget metus interdum blandit. Vestibulum ante ipsum primis in xfaucibus orci luctus et ultrices posuere cubilia Curae; Sed consectetur enim nec lectus dapibus efficitur.</p>')
a4 = Product.create!(title: 'Title title title title #4', description: 'Proin sodales elit et gravida fringilla. Nullam ut efficitur sapien. Aliquam ornare posuere ultrices. Nulla id placerat sem.', content: '<h1>Sed vitae massa sit amet arcu posuere sollicitudin ut a dui.</h1><p>Integer congue auctor enim, ut porta purus sagittis ut. Donec volutpat tellus id nisl volutpat eleifend. Aliquam facilisis odio in elementum venenatis. Vestibulum at est a ex volutpat porta. Sed pulvinar augue quis mauris auctor, eget volutpat nisl blandit. Suspendisse sapien elit, vestibulum eget odio et, tristique varius nibh. Nunc tincidunt mauris ac eros dictum dapibus. Ut tincidunt est nibh, et feugiat lectus ornare at. Mauris sodales ipsum nec tellus tempor, nec placerat est sodales. Fusce interdum suscipit felis, et vehicula nulla tempor non. Praesent dictum at eros sed tincidunt.</p>')
a5 = Product.create!(title: 'Titleee #5', description: 'Sed pulvinar augue quis mauris auctor, eget volutpat nisl blandit. Suspendisse sapien elit, vestibulum eget odio et, tristique varius nibh.', content: '<h1>Sed odio augue, malesuada id elit sit amet, lobortis dignissim urna.</h1><p>Nunc ullamcorper blandit mattis. Nunc at aliquam diam, vitae iaculis sapien. Ut maximus scelerisque tellus, ut vulputate mi placerat et.</p><h2>Vivamus vulputate posuere massa a lacinia.</h2><p>Nunc et ipsum ante. Sed lorem diam, fermentum vitae ipsum ac, gravida viverra urna. Nam sed dolor libero. Nam sed ante eget metus interdum blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed consectetur enim nec lectus dapibus efficitur.</p>')

puts "#{Product.count} products created!"