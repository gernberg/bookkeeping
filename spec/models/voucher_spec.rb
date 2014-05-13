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

  it "is possible to destroy last one in series" do
    @fiscal_year = FactoryGirl.create(:fiscal_year)
    @voucher1 = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)
    @voucher2 = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)
    @voucher3 = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)

    # Cant delete vouchers that are not the last one
    expect{
      @voucher1.destroy
    }.to change(Voucher, :count).by(0)
    expect{
      @voucher2.destroy
    }.to change(Voucher, :count).by(0)

    # Can delete vouchers that is the last one
    expect{
      @voucher3.destroy
    }.to change(Voucher, :count).by(-1)

    # Cant delete vouchers that are not the last one
    expect{
      @voucher1.destroy
    }.to change(Voucher, :count).by(0)

    # Can delete vouchers that is the last one
    expect{
      @voucher2.destroy
    }.to change(Voucher, :count).by(-1)


    # Can delete vouchers that is the last one
    expect{
      @voucher1.destroy
    }.to change(Voucher, :count).by(-1)
  end


  ## 
  # 
  # Date validations
  #
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
    @fiscal_year = FactoryGirl.create(:fiscal_year)
    @voucher = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)
    @voucher.number.should eq(1)
    @voucher = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)
    @voucher.number.should eq(2)
    @voucher.destroy
    @voucher = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)
    @voucher.number.should eq(2)
    @voucher.save
    @voucher.number.should eq(2)
    @voucher = FactoryGirl.create(:voucher, :fiscal_year => @fiscal_year)
    @voucher.number.should eq(3)
    @voucher.date = Time.now
    @voucher.save
    @voucher.number.should eq(3)
  end

  it "has a readable default to_s" do
    @voucher = FactoryGirl.create(:voucher)
    @voucher.to_s.should eq("1")
  end


  describe "from array" do 
    before do
      @fiscal_year = FactoryGirl.create(:fiscal_year, :start_date => 2.years.ago, :end_date => 1.year.ago)
      @voucher_params = {
        date: 18.months.ago,
        voucher_rows_attributes: [
          {
            account_id: FactoryGirl.create(:account).id,
            credit: 100
          },
          {
            account_id: FactoryGirl.create(:account).id,
            debit: 100
          },
          {
          } # totaly empty row just to stir it up :-)
        ],
        title: "Foo"
      }

    end
    it "is valid" do
      @voucher = Voucher.new(@voucher_params)
      @voucher.fiscal_year = @fiscal_year
      @voucher.should be_valid
    end
    it "has two rows" do
      @voucher = Voucher.new(@voucher_params)
      @voucher.fiscal_year = @fiscal_year
      @voucher.save
      @voucher.voucher_rows.count.should eq(2)
      Voucher.find(@voucher.id).voucher_rows.count.should eq(2)
    end
    it "changes total voucher_rowcount by two" do
      expect{
        @voucher = Voucher.new(@voucher_params)
        @voucher.fiscal_year = @fiscal_year
        @voucher.save
      }.to change(VoucherRow, :count).by(2)
    end
  end

  it "is invalid with one row" do
    @voucher = FactoryGirl.build(:voucher, :voucher_rows => [FactoryGirl.build(:voucher_row, debit: 100)])
    @voucher.should_not be_valid
  end
  it "is invalid without rows" do 
    @voucher = FactoryGirl.build(:voucher, :voucher_rows => [])
    @voucher.should_not be_valid
  end

  it "is invalid when not in balance" do 
    @voucher = FactoryGirl.build(:voucher, :voucher_rows => [FactoryGirl.build(:voucher_row, debit: 100)])
    @voucher.should_not be_valid
  end

end
