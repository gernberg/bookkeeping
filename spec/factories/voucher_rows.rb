# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :voucher_row do
    account {FactoryGirl.create(:account)}
  end
end
