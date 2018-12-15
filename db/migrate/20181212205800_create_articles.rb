class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :description
      t.text :content
      t.date :start_date, default: nil
      t.date :end_date, default: nil
      t.boolean :visible, default: false

      t.timestamps
    end
  end
end
