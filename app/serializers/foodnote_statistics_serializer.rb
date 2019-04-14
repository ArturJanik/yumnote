class FoodnoteStatisticsSerializer < ActiveModel::Serializer
  attributes :creation_date, :kcal, :carb, :fat, :prot
end
