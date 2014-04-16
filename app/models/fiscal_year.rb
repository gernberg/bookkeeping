class FiscalYear < ActiveRecord::Base
  has_paper_trail
  belongs_to :company
  validates_presence_of :company, :start_date, :end_date
end
