class AddDefaultsToDocument < ActiveRecord::Migration[5.2]
  def change
    change_column :documents, :visible, :boolean, default: false, null: false
  end
end
