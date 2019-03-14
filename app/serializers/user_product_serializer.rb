class UserProductSerializer < ActiveModel::Serializer    
  attributes :id, :name, :kcal, :carb, :fat, :prot, :amount, :unit, :visible, :category_id
end
