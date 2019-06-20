class AddIndexToUserAuthToken < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :auth_token, unique: true
  end
end
