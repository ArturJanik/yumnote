class AddNullToProductUser < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :user_id, :bigint, null: true
  end
end
