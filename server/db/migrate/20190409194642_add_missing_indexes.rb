class AddMissingIndexes < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :email
    add_index :documents, :slug
    add_index :products, :name
  end
end
