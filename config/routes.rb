Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  scope '/api' do
    post '/login' => "sessions#create"
    delete '/logout' => "sessions#destroy"
    
    resources :users, only: [:create, :update]
    # resources :users, except: [:index,:destroy] do
      # get 'statistics' => 'users#statistics'
    # end
    get  '/profile' => 'users#profile'
    post '/changepassword' => 'users#changepassword'
    post '/password/forgot', to: 'passwords#forgot'
    post '/password/reset', to: 'passwords#reset'

    get '/foodnotes/today' => 'foodnotes#index'
    get '/foodnotes/yesterday' => 'foodnotes#yesterday'
    get '/foodnotes/statistics' => 'foodnotes#statistics'
    get '/foodnotes/:day' => 'foodnotes#show'
    resources :foodnotes, only: [:create,:update,:destroy]

    resources :categories, only: [:index] do
      resources :products, only: [:index]
    end
    
    get '/products/currentuser' => 'products#userproducts'
    get '/products/latest' => 'products#latest'
    resources :products do
      patch :toggle_visibility, on: :member
    end

    get '/documents/:slug', to: 'documents#show'

    get '/categories/selectable', to: 'categories#selectable'
  end
end