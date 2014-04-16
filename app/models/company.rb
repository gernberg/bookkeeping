class Company < ActiveRecord::Base
  has_paper_trail
  has_many :fiscal_years
end
