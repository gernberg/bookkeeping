class Voucher < ActiveRecord::Base
  belongs_to :fiscal_year
  has_many :voucher_rows
  validates_presence_of :fiscal_year, :title, :date
  has_paper_trail
end
