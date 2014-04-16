class FiscalYear < ActiveRecord::Base
  has_paper_trail
  belongs_to :company
  validates_presence_of :company, :start_date, :end_date

  validates_date :start_date
  validates_date :end_date, :after => :start_date
  validates_date :end_date, :on_or_before => Proc.new{|f|f.start_date + 18.months}
end
