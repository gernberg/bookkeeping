class FiscalYear < ActiveRecord::Base
  has_paper_trail
  belongs_to :company
end
