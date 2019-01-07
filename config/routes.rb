Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  scope '/api' do
    post '/login' => "sessions#create"
    delete '/logout' => "sessions#destroy"
    
    resources :users, only: [:create,:show,:update,:destroy]
    get '/profile' => "users#profile"

    resources :articles, only: [:index,:show,:create,:update,:destroy]
  end
end
