class AddFoodnotesCountToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :foodnotes_count, :integer, default: 0, null: false
  end
end
