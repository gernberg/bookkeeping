require 'spec_helper'

describe VouchersController do

  before :each do
    @random_company = FactoryGirl.create(:company)
    @user_company = FactoryGirl.create(:company)
    @fiscal_year = FactoryGirl.create(:fiscal_year, company: @user_company)
    @random_fiscal_year = FactoryGirl.create(:fiscal_year, company: @random_company)

    # Add some vouchers to make sure tests are working
    FactoryGirl.create(:voucher)
    @random_voucher = FactoryGirl.create(:voucher, fiscal_year: @random_fiscal_year)
    @user_voucher = FactoryGirl.create(:voucher, fiscal_year: @fiscal_year)


    @user = FactoryGirl.create(:user) 
    @user.companies = [@user_company]
  end


  describe "signed in" do
    before :each do 
      sign_in @user 
    end

    it "accepts nested params" do
      expect{
        #voucher = FactoryGirl.attributes_for(:voucher)
        voucher = {
          title: "Title test",
          date: @user_voucher.date,
          fiscal_year_id: @user_voucher.fiscal_year.id
        }
        voucher[:voucher_rows_attributes] = [
          {account_id: FactoryGirl.create(:account).id, debit: 100},
          {account_id: FactoryGirl.create(:account).id, credit: 100}
        ]
        #
        post :create, company_id: @user_company.id, fiscal_year_id: @fiscal_year.id, voucher: voucher, format: :json 
        @fiscal_year.reload
      }.to change(VoucherRow, :count).by(2)
    end

    it "returns only the current companys fiscal years vouchers" do
      get "index", :company_id => @user_company.id, :fiscal_year_id => @fiscal_year.id, format: :json
      response.should be_success
      assigns(:vouchers).count.should eql(@fiscal_year.vouchers.count)
      assigns(:vouchers).to_a.should match_array(@fiscal_year.vouchers.to_a)
    end

    it "new voucher belongs to current fiscal year" do
      expect{
        post :create, company_id: @user_company.id, fiscal_year_id: @fiscal_year.id, voucher: FactoryGirl.attributes_for(:voucher), format: :json
        @fiscal_year.reload
      }.to change(@fiscal_year.vouchers, :count).by(1)
    end

    it "updates voucher for user" do
      expect{
        patch :update, company_id: @user_company.id, fiscal_year_id: @fiscal_year.id, id: @user_voucher.id, voucher: {title: "Newtitle"}, format: :json
        @user_voucher.reload
      }.to change(@user_voucher, :title).to("Newtitle")
    end

    it "doesnt create vouchers to other companies fiscal years" do
      expect{
        post :create, company_id: @user_company.id, fiscal_year_id: @random_fiscal_year.id, voucher: FactoryGirl.attributes_for(:voucher), format: :json
        @fiscal_year.reload
      }.to raise_error
    end

    it "doesnt create vouchers to other companies fiscal years" do
      expect{
        post :create, company_id: @random_company.id, fiscal_year_id: @random_fiscal_year.id, voucher: FactoryGirl.attributes_for(:voucher), format: :json
        @fiscal_year.reload
      }.to raise_error
    end

  end

  describe "not signed in" do
    it "returns only the current companys fiscal years vouchers" do
      get "index", :company_id => @user_company.id, :fiscal_year_id => @fiscal_year.id
      response.should_not be_success
    end
  end
end
