class FiscalYear < ActiveRecord::Base
  has_paper_trail
  belongs_to :company
  validates_presence_of :company, :start_date, :end_date
  
  # Only check intervals if dates are supplied
  validate :check_year_interval, :if=>Proc.new{|fy| fy.start_date.present? && fy.end_date.present?}


  ## 
  # Checks that year conforms to swedish regulations
  def check_year_interval
    if (end_date - start_date) > 0
      errors.add(:start_date, :should_not_end_before_start)
    elsif (end_date - start_date) > 18.months
      errors.add(:end_date, :could_not_exceed_18_months)
    end
  end
end
