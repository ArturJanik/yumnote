# README

Live beta (finally): [calories.today](https://calories.today/)

## Stack:

### backend

* Ruby 2.3.6-p384
* Rails 5.2.2
* Postgresql
* Puma server

### frontend

* React 16.8.3
* Redux 4.0.1
* Jest 23.6.0

## Test suite

### backend

* RSpec - 100% coverage based on [simplecov](https://github.com/colszowka/simplecov) plugin, but realistically around 60%.

### frontend

* Jest - only few tests to check how Jest works, I'm not convinced which parts of frontend should be tested - pretty sure there is no need for 100% coverage, and I should focus only on validations and API requests...

## Used plugins

* Axios - all comunication with api, 
* Chart.js - visual presentation of user statistics, 
* lodash - general toolset,
* Pikaday - date selection on product & foodnote list,
* Moment.js - date parsing,
* perfect-scrollbar

## ToDo
### Critical
* Complete Privacy Policy and Functions pages
### Important
* More sensible multi-device auth management (possibly whole auth refactor)
* Confirmation mail on register
* Deeper tests of timezone handling
* Tests on anything iOS based
### Of moderate concern
* I18n
* Add functionality to create personal dishes/meals for fast reuse
* Add personal weight log
### Of least concern
* Cover more frontend with tests

## Optimization

### Frontend - Done

* Used 'why-did-you-update' tool to identify app elements with most redundant rerenders and refactored code to avoid most non-Router related ones.
* Used 'source-map-explorer' tool to identify final build package bloats - went from 2.4MB to 1.6MB on home page for logged in user (foodnote list)

### Frontend - TODO

* Find out if it's possible to filter useless rerenders triggered by Router

### Backend - TODO

* Narrow down queried fields to those required in response - partially Done
* TODO...

## Potential scaling strategies

* First step - host app on at least two servers and direct traffic through load balancer
* Second step - move all statistical queries to separate server and update statistical db every 1 hour (to accomodate different timezones that users may use)
* Third step - cache most common db requests - list of categories, documents
* Fourth step - session optimization (keeping them in memory? redis? what if server dies/restarts?)
* TODO...

## Notes during development

1. (dependencies error) webpack-dev-server version from 3.1.11 to 3.1.13 prevents automatic reload during code changes