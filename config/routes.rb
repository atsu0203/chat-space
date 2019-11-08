Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:create, :new, :edit, :update] do
    resources :messages, only: [:create, :index]
  end
end
