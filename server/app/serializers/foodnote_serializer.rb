class FoodnoteSerializer < ActiveModel::Serializer
  belongs_to :product
  
  attributes :id, :amount, :creation_date
end
