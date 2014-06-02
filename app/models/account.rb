class Account < ActiveRecord::Base
  has_many :vouchers
  belongs_to :company
  validates_presence_of :account_number
  validates_length_of :account_number, maximum: 4, minimum: 4
end
