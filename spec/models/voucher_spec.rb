require 'spec_helper'

describe Voucher do
  it "has a valid factory" do
    FactoryGirl.build(:voucher).should be_valid
  end
  it "needs title to save" do
    FactoryGirl.build(:voucher, title: nil).should_not be_valid
  end
  it "needs date to save" do
    FactoryGirl.build(:voucher, date: nil).should_not be_valid
  end
  pending "belongs to a fiscal year"
  pending "Is inside fiscal year"
end
