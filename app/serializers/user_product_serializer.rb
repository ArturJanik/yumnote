class UserProductSerializer < ActiveModel::Serializer  
  belongs_to :category
  
  attributes :id, :name, :kcal, :carb, :fat, :prot, :amount, :unit, :visible
end
