FactoryGirl.define do
  factory :voucher do
    fiscal_year {FactoryGirl.build(:fiscal_year)}
    title "Randomtext"
    date Date.new(Time.now.year)
  end
end
