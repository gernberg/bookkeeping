require 'spec_helper'

describe Account do
  it "has valid factory" do
    FactoryGirl.build(:account).should be_valid
  end
  it "is invalid without account no" do
    FactoryGirl.build(:account, {account_number: nil}).should_not be_valid
  end
  it "is invalid with less than 4 digit account no" do
    FactoryGirl.build(:account, {account_number: "123"}).should_not be_valid
    FactoryGirl.build(:account, {account_number: ""}).should_not be_valid
  end
  it "is invalid with more than 4 digit account no" do
    FactoryGirl.build(:account, {account_number: "12345"}).should_not be_valid
    FactoryGirl.build(:account, {account_number: "12346"}).should_not be_valid
  end
  it "is valid with 4 digit account no" do
    FactoryGirl.build(:account, {account_number: "1234"}).should be_valid
  end
  it "needs company" do
    FactoryGirl.build(:account, {company_id: nil}).should_not be_valid
  end
  pending "does not collide with other account numbers"
  pending "by defauly - orders by account number"
end
