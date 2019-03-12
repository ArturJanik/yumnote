class AddCreationDateToFoodnote < ActiveRecord::Migration[5.2]
  def change
    add_column :foodnotes, :creation_date, :date
    add_index :foodnotes, [:creation_date]
  end
end
