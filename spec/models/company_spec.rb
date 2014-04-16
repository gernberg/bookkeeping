require 'spec_helper'

describe Company do
  it "has valid factory" do
    FactoryGirl.build(:company).should be_valid
  end
  it "Can have user assigned to it" do
    @user = FactoryGirl.create(:user)
    @company = FactoryGirl.create(:company, :users => [@user])
    @company.users.first.should eql(@user)
  end
  it "Can have many users assigned to it" do
    @company = FactoryGirl.create(:company)
    @user1 = FactoryGirl.create(:user)
    @user2 = FactoryGirl.create(:user)
    @user3 = FactoryGirl.create(:user)

    @company.users = [@user1, @user2, @user3]
    @company.save
    @company.users.count.should eql(3)
    expect(@company.users).to include(@user1)
  end
end
