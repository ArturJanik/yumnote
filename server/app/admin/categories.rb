ActiveAdmin.register Category do
  permit_params :name, :active, :order, :color, :slug, :parent_id

  form do |f|
    f.semantic_errors
    f.inputs do
      f.input :name
      f.input :active, as: :boolean
      f.input :parent
    end
    f.actions
  end

  before_create do |category|
    slug = category.name.parameterize

    i = 1
    loop do
      if Category.where(slug: slug).exists?
        slug = category.name.parameterize + "-#{i}"
        i+=1
      else
        category.slug = slug
        break
      end
    end
  end
end
