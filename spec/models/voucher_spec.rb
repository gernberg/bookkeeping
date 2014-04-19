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

  it "accepts valid date" do
    FactoryGirl.build(:voucher, date: Date.new(Time.now.year)).should be_valid
  end

  it "rejects invalid date" do
    FactoryGirl.build(:voucher, date: "1234-56-78").should_not be_valid
  end

  it "belongs to a fiscal year" do
    FactoryGirl.build(:voucher, fiscal_year: nil).should_not be_valid
  end
  
  it "is valid inside fiscal year" do
    @fiscal_year = FactoryGirl.create(:fiscal_year, :start_date => 2.years.ago, :end_date => 1.year.ago);
    FactoryGirl.build(:voucher, fiscal_year: @fiscal_year, date: 18.months.ago).should be_valid
  end
  
  it "is invalid after fiscal year" do
    @fiscal_year = FactoryGirl.create(:fiscal_year, :start_date => 2.years.ago, :end_date => 1.year.ago);
    FactoryGirl.build(:voucher, fiscal_year: @fiscal_year, date: 3.years.ago).should_not be_valid
  end
  
  it "is invalid before fiscal year" do
    @fiscal_year = FactoryGirl.create(:fiscal_year, :start_date => 2.years.ago, :end_date => 1.year.ago);
    FactoryGirl.build(:voucher, fiscal_year: @fiscal_year, date: 11.months.ago).should_not be_valid
    FactoryGirl.build(:voucher, fiscal_year: @fiscal_year, date: 1.months.ago).should_not be_valid
    FactoryGirl.build(:voucher, fiscal_year: @fiscal_year, date: 1.months.ago).should_not be_valid
  end

  it "gets a sequential number" do
    @voucher = FactoryGirl.create(:voucher)
    @voucher.number.should eq(1)
  end

end
