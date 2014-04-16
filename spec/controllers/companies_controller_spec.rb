require 'spec_helper'

describe CompaniesController do
  describe "signed in" do
    before :each do 
      @random_company = FactoryGirl.create(:company)
      @user_company = FactoryGirl.create(:company)
      @user = FactoryGirl.create(:user) # Using factory girl as an example
      @user.companies = [@user_company]
      sign_in @user 
    end
    it "returns only the users companies" do
      get "index"
      response.should be_success
      assigns(:companies).count.should eql(@user.companies.count)
      assigns(:companies).to_a.should match_array(@user.companies.to_a)
    end
    it "edit user companies" do
      newname = "a" + rand(100).to_s.to_s
      expect{
        put :update, id: @user_company, company: {name: newname}
        @user_company.reload
      }.to change(@user_company, :name).to(newname)
    end
    it "shows users companies" do
      get :show, id: @user_company
      response.should be_success
    end
    it "can't show other users companies" do
      expect{
        get :show, id: @random_company
      }.to raise_error
    end
    it "can't edit other users companies" do
      newname = "a" + rand(100).to_s.to_s
      expect{
        expect{
          put :update, id: @random_company, company: {name: newname}
          @random_company.reload
        }.to_not change(@random_company, :name).to(newname)
      }.to raise_error
    end
    it "destroy users company" do
      expect{
        expect{
          delete :destroy, id: @random_company
        }.to change(Company, :count).by(-1)
      }.to_not raise_error
    end
    it "can't destroy other users companies" do
      expect{
        expect{
          delete :destroy, id: @random_company
        }.to_not change(Company, :count)
      }.to raise_error
    end
  end
  describe "not signed in" do
    it "should require login" do
      get "index"
      response.should_not be_success
    end
  end
end
