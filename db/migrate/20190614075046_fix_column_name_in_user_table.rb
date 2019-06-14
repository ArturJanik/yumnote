class FixColumnNameInUserTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :signup_confimation_token, :signup_confirmation_token
  end
end
