class Voucher < ActiveRecord::Base
  belongs_to :fiscal_year
  has_many :voucher_rows
  validates_presence_of :fiscal_year, :title, :date
  validates_date :date, :on_or_before => Proc.new{|f| f.fiscal_year.end_date}
  validates_date :date, :on_or_after => Proc.new{|f| f.fiscal_year.start_date}
  has_paper_trail
end
