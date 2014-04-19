require 'spec_helper'

describe Voucher do
  it "has a valid factory" do
    FactoryGirl.build(:voucher).should be_valid
  end
  pending "has a valid account"
  pending "belongs to a fiscal year"
  pending "Is inside fiscal year"
end
