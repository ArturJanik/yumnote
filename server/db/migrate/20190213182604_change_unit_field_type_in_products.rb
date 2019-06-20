class ChangeUnitFieldTypeInProducts < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :unit, :string, default: 'g', null: false
  end
end
