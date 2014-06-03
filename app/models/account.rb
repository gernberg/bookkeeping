class Account < ActiveRecord::Base
  has_many :voucher_rows
  has_many :vouchers, :through=>:voucher_rows
  belongs_to :company
  validates_presence_of :account_number, :company
  validates_length_of :account_number, maximum: 4, minimum: 4
  default_scope order("account_number ASC")
end
