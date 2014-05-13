class VoucherRow < ActiveRecord::Base
  has_paper_trail

  belongs_to :account
  belongs_to :voucher
  validates_presence_of :account

end
