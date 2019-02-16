class Foodnote < ApplicationRecord
  belongs_to :product
  belongs_to :user
  
  validates :user_id, :product_id, :amount, presence: true
  validates_associated :user
  validates_associated :product
  validates :amount, numericality: { greater_than: 0 }
  
  # scope :created_between, lambda {|start_date, end_date| where("created_at >= ? AND created_at <= ?", start_date, end_date )}
  scope :from_today, -> { where('foodnotes.created_at BETWEEN ? AND ?', Time.zone.now.beginning_of_day, Time.zone.now.end_of_day)}
  # scope :from_yesterday, -> { where('foodnotes.created_at BETWEEN ? AND ?', Time.zone.yesterday.beginning_of_day, Time.zone.yesterday.end_of_day)}
  # scope :from_day, ->(date) { where('foodnotes.created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day)}
  scope :with_products, -> { includes(:product) }

  #  Podczas przypisywania wartości do zmiennej amount trzeba sprawdzić czy wartość jest przesyłana z przecinkiem czy kropką i ją ujednolicić
    def amount=(val)
      str_val = val.to_s
      str_val.sub!(',', '.')
      self['amount'] = val
    end
end