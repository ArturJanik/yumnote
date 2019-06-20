class RemoveFoodnotesCountFromProduct < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :foodnotes_count
  end
end
