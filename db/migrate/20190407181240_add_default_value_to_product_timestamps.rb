class AddDefaultValueToProductTimestamps < ActiveRecord::Migration[5.2]
  def change
    change_column :products, :created_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }, null: false
    change_column :products, :updated_at, :datetime, null: true
  end
end
