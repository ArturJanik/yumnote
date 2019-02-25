class Foodnote < ApplicationRecord
  belongs_to :product
  belongs_to :user
  
  validates :user_id, :product_id, :amount, presence: true
  validates_associated :user
  validates_associated :product
  validates :amount, numericality: { greater_than: 0 }
  
  scope :created_between, lambda {|start_date, end_date| where("foodnotes.created_at >= ? AND foodnotes.created_at <= ?", start_date, end_date)}
  scope :from_today, -> { where('foodnotes.created_at BETWEEN ? AND ?', Time.zone.now.beginning_of_day, Time.zone.now.end_of_day)}
  scope :from_yesterday, -> { where('foodnotes.created_at BETWEEN ? AND ?', Time.zone.yesterday.beginning_of_day, Time.zone.yesterday.end_of_day)}
  scope :from_day, ->(date) { where('foodnotes.created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day)}
  scope :between, ->(firstDate, lastDate) { where('foodnotes.created_at BETWEEN ? AND ?', firstDate, lastDate) }
  scope :with_products, -> { includes(:product) }
  scope :from_last_year, -> { select(Arel.sql('DATE(foodnotes.created_at) AS created_at, SUM (foodnotes.amount * products.kcal) AS kcal, SUM (foodnotes.amount * products.carb) AS carb, SUM (foodnotes.amount * products.fat) AS fat, SUM (foodnotes.amount * products.prot) AS prot')).joins(:product).between(Time.zone.yesterday - 365.days, Time.zone.yesterday).group(Arel.sql('DATE(foodnotes.created_at)')).order(Arel.sql('DATE(foodnotes.created_at)')) }

  #  Podczas przypisywania wartości do zmiennej amount trzeba sprawdzić czy wartość jest przesyłana z przecinkiem czy kropką i ją ujednolicić
    def amount=(val)
      str_val = val.to_s
      str_val.sub!(',', '.')
      self['amount'] = val
    end
end

# SELECT TO_CHAR(f.created_at::DATE, 'dd/mm/yyyy') AS date, SUM(f.amount * p.kcal) AS kcal, SUM(f.amount * p.carb) AS carb, SUM(f.amount * p.fat) AS fat, SUM(f.amount * p.prot) AS prot 
# FROM foodnotes AS f 
# JOIN products AS p ON f.product_id = p.id 
# GROUP BY f.created_at::DATE 
# ORDER BY f.created_at::DATE