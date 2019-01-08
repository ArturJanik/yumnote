# README

Based on:

* Ruby 2.3.6-p384
* Rails 5.2.2
* Postgresql
* Puma server
* React 16.6.3
* Redux 4.0.1

## Installation (in progress)

1. Clone repo
2. Run command: _bundle install_
- optionally: _gem install nokogiri -- --use-system-libraries_ and then _bundle install_ if required
3. Go to client directory
4. Run command: _npm install_
5. Uncomment line __config.secret_key__ in __config/initializers/devise.rb__ file
6. Delete file __config/credentials.yml.enc__
7. Go back to base directory
8. Run command: _EDITOR=VIM rails credentials:edit_
9. Inside VIM: press ESC and enter :wq to save changes and exit
10. Change __config/database.yml__ to your postgresql database settings/credentials
11. Run command: _rake db:migrate_

## Notes during development

1. webpack-dev-server version from 3.1.11 to 3.1.13 prevents automatic reload during code changes