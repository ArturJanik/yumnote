class FoodnoteSerializer < ActiveModel::Serializer
  belongs_to :product
  
  attributes :id, :amount
end
