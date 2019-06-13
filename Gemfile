source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.3.6'

gem 'rails', '~> 5.2.1'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '= 3.12.0'
gem 'bcrypt', '~> 3.1.7'

gem 'active_model_serializers', '~> 0.10.0'

# ActiveAdmin dependencies
gem "devise", ">= 4.6.0"
gem 'activeadmin'
gem 'ransack', '~> 2.1.1'

gem 'tinymce-rails'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'rack-cors'

gem 'dotenv-rails'

group :development, :test do
  gem 'faker'
  gem 'rspec-rails', '~> 3.8'
end

group :test do
  gem 'byebug'
  gem "factory_bot_rails"
  gem 'shoulda-matchers'
  gem 'capybara'
  gem 'simplecov', require: false
end

group :development do
  gem 'bullet'
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
