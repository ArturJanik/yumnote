class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
      t.boolean :active, default: true
      t.integer :order
      t.string :color
      t.references :parent, index: true, foreign_key: {to_table: :categories}

      t.timestamps
    end
  end
end
