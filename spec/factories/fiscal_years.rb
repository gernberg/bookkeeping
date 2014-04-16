# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fiscal_year do
    end_date Date.new(Time.now.year)
    start_date Date.new(1.year.ago.year)
    company {FactoryGirl.build(:company)}
  end
end
