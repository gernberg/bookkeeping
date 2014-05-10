require 'spec_helper'

describe VoucherRow do
  it "has valid factory" do
    FactoryGirl.build(:voucher_row).should be_valid
  end
end
