# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fiscal_year do
    start_date Date.new(Time.now.year)
    end_date Date.new(1.year.ago.year)
    company {FactoryGirl.build(:company)}
  end
end
