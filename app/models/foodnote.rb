class Foodnote < ApplicationRecord
  belongs_to :product
  belongs_to :user
  
  validates :user_id, :product_id, :creation_date, presence: true
  validates_associated :user
  validates_associated :product
  validates :amount, numericality: { greater_than: 0 }
  
  scope :from_today, -> { where('foodnotes.creation_date = ?', Time.zone.today)}
  scope :from_yesterday, -> { where('foodnotes.creation_date = ?', Time.zone.yesterday)}
  scope :from_day, ->(date) { where('foodnotes.creation_date = ?', date)}
  scope :created_between, ->(firstDate, lastDate) { where('foodnotes.creation_date BETWEEN ? AND ?', firstDate, lastDate) }
  scope :with_products, -> { includes(:product) }
  scope :from_last_year, -> { select(Arel.sql('DATE(foodnotes.creation_date) AS creation_date, SUM (foodnotes.amount * products.kcal) AS kcal, SUM (foodnotes.amount * products.carb) AS carb, SUM (foodnotes.amount * products.fat) AS fat, SUM (foodnotes.amount * products.prot) AS prot')).joins(:product).created_between(Time.zone.yesterday - 365.days, Time.zone.yesterday).group(Arel.sql('DATE(foodnotes.creation_date)')).order(Arel.sql('DATE(foodnotes.creation_date)')) }

  #  Podczas przypisywania wartości do zmiennej amount trzeba sprawdzić czy wartość jest przesyłana z przecinkiem czy kropką i ją ujednolicić
  def amount=(val)
    if val =~ /\A\d*[\d,.]\d*\z/
      str_val = val.to_s
      str_val = str_val.sub(',', '.')
      self['amount'] = str_val.to_f
    else
      self['amount'] = val
    end
  end

  def creation_date=(val)
    if val
      parsed_val = Time.zone.parse(val).to_date
      self['creation_date'] = parsed_val
    else
      self['creation_date'] = val
    end
  end
end