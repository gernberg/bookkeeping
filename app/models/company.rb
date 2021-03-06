class Company < ActiveRecord::Base
  has_paper_trail
  has_many :fiscal_years
  has_many :accounts
  validates_presence_of :name
  has_and_belongs_to_many :users
end
