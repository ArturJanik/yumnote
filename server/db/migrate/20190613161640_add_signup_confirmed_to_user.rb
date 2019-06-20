class AddSignupConfirmedToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :signup_confirmed, :boolean, default: false, null: false
    add_column :users, :signup_confimation_token, :string
  end
end
