class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name
      t.float :kcal
      t.float :carb
      t.float :fat
      t.float :prot
      t.float :amount
      t.integer :unit
      
      t.references :category, index: true, foreign_key: true, null: true, default: nil
      t.references :user, index: true, foreign_key: true, null: true, default: nil
      t.boolean :visible, default: true

      t.timestamps
    end
  end
end