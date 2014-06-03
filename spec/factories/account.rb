# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :account do
    account_number 1234
    company {FactoryGirl.build(:company)}
  end
end
