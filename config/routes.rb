Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  scope '/api' do
    post '/login' => "sessions#create"
    delete '/logout' => "sessions#destroy"
    
    resources :users, except: [:index,:destroy] do
      # get 'foodnotes/today' => 'foodnotes#index'
      # get 'foodnotes/yesterday' => 'foodnotes#yesterday'
      # get 'foodnotes/:day' => 'foodnotes#show'
      # get 'statistics' => 'users#statistics'
      # resources :foodnotes, only: [:new,:create,:edit,:update,:destroy]
    end
    # get '/profile' => "users#profile"

    # resources :categories, only: [:show] do
    #   resources :products
    # end
    resources :products, only: [:index,:show,:create,:update,:destroy]
  end
end