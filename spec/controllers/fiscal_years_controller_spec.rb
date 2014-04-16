require 'spec_helper'

describe FiscalYearsController do
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

    it "returns only the current companys fiscal years" do
      get "index", :company_id => @user_company.id
      response.should be_success
      assigns(:fiscal_years).count.should eql(@user_company.fiscal_years.count)
      assigns(:fiscal_years).to_a.should match_array(@user_company.fiscal_years.to_a)
    end

    it "new fiscal year belongs to current company" do
      expect{
        post :create, company_id: @user_company.id, fiscal_year: FactoryGirl.attributes_for(:fiscal_year, {start_date: 10.years.ago, end_date: 9.years.ago})
        @user_company.reload
      }.to change(@user_company.fiscal_years, :count).by(1)
    end

    it "edit companies fiscal years" do
      expect{
        put :update, id:@fiscal_year, company_id: @user_company.id, fiscal_year: {start_date: 10.years.ago.year, end_date: 9.years.ago.year}
        @fiscal_year.reload
        puts @fiscal_year.inspect
      }.to change(@fiscal_year, :start_date).to(Date.new(10.years.ago.year))
    end
    it "shows companies fiscal year" do
      get :show, company_id: @user_company.id, id: @fiscal_year
      response.should be_success
    end

    it "can't show other user fiscal year" do
      expect{
        get :show, id: @random_fiscal_year, company_id: @user_company.id
      }.to raise_error
    end

    it "can't edit other users companies" do
      newname = "a" + rand(100).to_s.to_s
      expect{
        expect{
          put :update, id: @random_fiscal_year, company_id: @random_company.id, fiscal_year: {start_date:10.years.ago.year, end_date: 9.years.ago.year}
          @random_fiscal_year.reload
        }.to_not change(@random_fiscal_year, :start_date).to(10.years.ago.year)
      }.to raise_error
    end

    it "destroy users company" do
      expect{
        expect{
          delete :destroy, id: @fiscal_year, company_id: @user_company.id
        }.to change(FiscalYear, :count).by(-1)
      }.to_not raise_error
    end

    it "can't destroy other users companies" do
      expect{
        expect{
          delete :destroy, id: @random_fiscal_year, company_id: @random_company.id
        }.to_not change(FiscalYear, :count)
      }.to raise_error
      expect{
        expect{
          delete :destroy, id: @random_fiscal_year, company_id: @user_company.id
        }.to_not change(FiscalYear, :count)
      }.to raise_error
      expect{
        expect{
          delete :destroy, id: @random_fiscal_year
        }.to_not change(FiscalYear, :count)
      }.to raise_error
    end
  end
  describe "not signed in" do
    it "should require login" do
      get "index", :company_id => @user_company.id
      response.should_not be_success
    end
  end
end
