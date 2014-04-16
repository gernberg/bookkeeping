require 'spec_helper'

describe FiscalYear do
  it "has valid factory" do
    FactoryGirl.build(:fiscal_year).should be_valid
  end

  it "could be 18 months" do
    FactoryGirl.build(:fiscal_year, {start_date: Time.new, end_date: 18.months.ago}).should be_valid
  end

  it "must not be longer than a 18 months" do
    FactoryGirl.build(:fiscal_year, {start_date: 19.months.ago, end_date: Time.now}).should_not be_valid
  end

  it "must belong to a company" do
    FactoryGirl.build(:fiscal_year, {company: nil}).should_not be_valid
  end

  it "must have a start date" do
    FactoryGirl.build(:fiscal_year, {start_date: nil}).should_not be_valid
  end

  it "must have a end date" do
    FactoryGirl.build(:fiscal_year, {end_date: nil}).should_not be_valid
  end

  it "must not end before it starts" do
    puts "must not end"
    FactoryGirl.build(:fiscal_year, {start_date: 1.year.ago.year, end_date: Time.now.year}).should_not be_valid
  end

  pending "must not overlap" do

  end

end
