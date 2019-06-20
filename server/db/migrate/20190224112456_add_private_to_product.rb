class AddPrivateToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :private, :boolean, default: false
  end
end
