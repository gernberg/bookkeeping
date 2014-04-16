require 'spec_helper'

describe FiscalYear do
  it "has valid factory" do
    FactoryGirl.build(:fiscal_year).should be_valid
  end

  it "could be 18 months" do
    FactoryGirl.build(:fiscal_year, {start_date: 18.months.ago, end_date: Date.new}).should be_valid
  end

  it "must not be longer than a 18 months" do
    FactoryGirl.build(:fiscal_year, {start_date: 19.months.ago, end_date: Date.new}).should_not be_valid
  end

  it "must belong to a company" do
    FactoryGirl.build(:fiscal_year, {company: nil}).should_not be_valid
  end

end
