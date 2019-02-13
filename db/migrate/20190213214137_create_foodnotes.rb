class CreateFoodnotes < ActiveRecord::Migration[5.2]
  def change
    create_table :foodnotes do |t|
      t.references :product, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.float :amount

      t.timestamps
    end
    add_index :foodnotes, :created_at
  end
end
