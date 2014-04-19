FactoryGirl.define do
  factory :voucher do
    fiscal_year {FactoryGirl.build(:fiscal_year)}
    title "RAndomtext"
    date Date.new(Time.now.year)
  end
end
