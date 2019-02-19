Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  scope '/api' do
    post '/login' => "sessions#create"
    delete '/logout' => "sessions#destroy"

    get '/foodnotes/today' => 'foodnotes#index'
    get '/foodnotes/yesterday' => 'foodnotes#yesterday'
    get '/foodnotes/:day' => 'foodnotes#show'
    resources :foodnotes, only: [:create,:update,:destroy]
    
    resources :users, except: [:index,:destroy] do
      # get 'statistics' => 'users#statistics'
    end
    # get '/profile' => "users#profile"

    # resources :categories, only: [:index] do
    #   resources :products
    # end
    resources :categories, only: [:index]
    resources :products, only: [:index,:show,:create,:update,:destroy]
  end
end