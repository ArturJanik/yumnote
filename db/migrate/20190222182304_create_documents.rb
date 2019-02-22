class CreateDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.string :title
      t.text :short_content
      t.text :content
      t.string :slug
      t.boolean :visible

      t.timestamps
    end
  end
end
