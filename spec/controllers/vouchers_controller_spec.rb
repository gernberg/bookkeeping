require 'spec_helper'

describe VouchersController do

  before :each do
    @random_company = FactoryGirl.create(:company)
    @user_company = FactoryGirl.create(:company)
    @fiscal_year = FactoryGirl.create(:fiscal_year, company: @user_company)
    @random_fiscal_year = FactoryGirl.create(:fiscal_year, company: @random_company)


    @user = FactoryGirl.create(:user) 
    @user.companies = [@user_company]
  end
  describe "signed in" do
    before :each do 
      sign_in @user 
    end
    it "returns only the current companys fiscal years vouchers" do
      get "index", :company_id => @user_company.id, :fiscal_year_id => @fiscal_year.id
      response.should be_success
      assigns(:vouchers).count.should eql(@fiscal_year.vouchers.count)
      assigns(:vouchers).to_a.should match_array(@fiscal_year.vouchers.to_a)
    end
  end
  describe "not signed in" do
    it "returns only the current companys fiscal years vouchers" do
      get "index", :company_id => @user_company.id, :fiscal_year_id => @fiscal_year.id
      response.should_not be_success
    end
  end
end
