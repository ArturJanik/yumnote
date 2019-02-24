Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  scope '/api' do
    post '/login' => "sessions#create"
    delete '/logout' => "sessions#destroy"
    
    resources :users, only: [:create]
    # resources :users, except: [:index,:destroy] do
      # get 'statistics' => 'users#statistics'
    # end
    get '/profile' => "users#profile"

    get '/foodnotes/today' => 'foodnotes#index'
    get '/foodnotes/yesterday' => 'foodnotes#yesterday'
    get '/foodnotes/:day' => 'foodnotes#show'
    resources :foodnotes, only: [:create,:update,:destroy]

    resources :categories, only: [:index] do
      resources :products, only: [:index]
    end
    
    resources :products, only: [:toggle_visibility, :destroy] do
      patch :toggle_visibility, on: :member
    end

    get '/products/currentuser' => 'products#userproducts'
    get '/products/latest' => 'products#latest'

    get '/documents/:slug', to: 'documents#show'
  end
end