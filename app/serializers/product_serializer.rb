class ProductSerializer < ActiveModel::Serializer
  has_many :foodnotes
  
  attributes :id, :name, :kcal, :carb, :fat, :prot, :amount, :unit
end
