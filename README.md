# README

Based on:

* Ruby 2.3.6-p384
* Rails 5.2.2
* Postgresql
* Puma server
* React 16.8.3
* Redux 4.0.1

## Used plugins

* Axios - all comunication with api, 
* Chart.js - visual presentation of user statistics, 
* lodash - general toolset,
* Pikaday - date selection on product & foodnote list,
* Moment.js - date parsing,
* perfect-scrollbar.

## Potential scaling strategies

* First step - host app on at least two servers and direct traffic through load balancer
* Second step - move all statistical queries to separate server and update statistical db every 1 hour (to accomodate different timezones that users may use)
* Third step - cache most common db requests - list of categories, documents
* Fourth step - session optimization (keeping them in memory? redis? what if server dies/restarts?)
* TODO...

## Installation

### Base setup
1. Clone repo
2. Run command: _bundle install_
- __optionally__: _gem install nokogiri -- --use-system-libraries_ and then _bundle install_ if required
3. Go to client directory
4. Run command: _npm install_
5. Uncomment line __config.secret_key__ in __config/initializers/devise.rb__ file
6. Delete file __config/credentials.yml.enc__
7. In __/config/environments/development.rb__ comment out lines 57 and 58...
⋅⋅⋅...or create free account on mailtrap.io. You will pass your demo inbox credentials into new credentials file (see: step 9). This is required to test functioning of mailers (password reset).
8. Go back to base directory
9. Run command: _EDITOR=VIM rails credentials:edit_
⋅⋅⋅If you have followed second option in step 7, add your mailtrap demo inbox smtp credentials.
10. Inside VIM: press ESC and enter :wq to save changes and exit. 

### Database
11. You will need a postgresql db installed on your machine
12. Change __config/database.yml__ to your postgresql database settings/credentials
13. Run command: _rake db:migrate_

### Run app
14. Run command: _foreman start -p 3000_ to test app

## Notes during development

1. (dependencies error) webpack-dev-server version from 3.1.11 to 3.1.13 prevents automatic reload during code changes