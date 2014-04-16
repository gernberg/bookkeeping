# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fiscal_year do
    start_date Time.now.year
    end_date 1.year.ago.year
    company {FactoryGirl.build(:company)}
  end
end
