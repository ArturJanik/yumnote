class FoodnoteStatisticsSerializer < ActiveModel::Serializer
  attributes :created_at, :kcal, :carb, :fat, :prot
end
