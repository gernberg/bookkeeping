FactoryGirl.define do
  factory :voucher do
    fiscal_year {FactoryGirl.build(:fiscal_year)}
    title "RAndomtext"
    date Time.now
  end
end
