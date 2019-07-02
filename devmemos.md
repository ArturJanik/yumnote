# If it fails silently on admin page

1. run `rails tmp:cache:clear` from shell
2. if it won't work, add `gem 'coffee-rails', '~> 5.0.0` to `Gemfile` and run `bundle:install`, and then clear cache

# If it fails autoreloading during dev

1. (dependencies error) webpack-dev-server version from 3.1.11 to 3.1.13 prevents automatic reload during code changes