ActiveAdmin.register Document do
  permit_params :title, :content, :short_content, :visible, :slug

  form do |f|
    f.semantic_errors
    f.inputs do
      f.input :title
      f.input :short_content, as: :text, input_html: { rows: 5, cols: 10 }
      f.input :content, as: :text, input_html: { rows: 20, cols: 10 }
      f.input :visible, as: :boolean
    end
    f.actions
  end

  before_create do |document|
    slug = document.title.parameterize

    i = 1
    loop do
      if Document.where(slug: slug).exists?
        slug = document.title.parameterize + "-#{i}"
        i+=1
      else
        document.slug = slug
        break
      end
    end
  end
end