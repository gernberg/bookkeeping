FactoryGirl.define do
  factory :voucher do
    fiscal_year {FactoryGirl.build(:fiscal_year)}
    title "Randomtext"
    date Date.new(Time.now.year)
    voucher_rows {[
      FactoryGirl.build(:voucher_row, debit: 100),
      FactoryGirl.build(:voucher_row, credit: 100)
    ]}
  end
end
