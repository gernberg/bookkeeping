class Account < ActiveRecord::Base
  has_many :vouchers
  belongs_to :company
end
