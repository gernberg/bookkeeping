class Voucher < ActiveRecord::Base
  belongs_to :fiscal_year
  has_many :voucher_rows
  validates_presence_of :fiscal_year, :title, :date

  validates_date :date, :on_or_before => Proc.new{|f| f.fiscal_year.end_date}
  validates_date :date, :on_or_after => Proc.new{|f| f.fiscal_year.start_date}

  validate :validate_rows

  before_validation :remove_empty_rows

  accepts_nested_attributes_for :voucher_rows

  has_paper_trail

  before_create :increase_number
  before_destroy :check_if_last

  def remove_empty_rows
    self.voucher_rows = self.voucher_rows.delete_if {|row| row.account == nil}
  end
  def check_if_last
    number == last_number
  end

  def increase_number
    self.number = last_number + 1
  end

  def last_number
    fiscal_year.vouchers.count
  end

  def to_s
    number.to_s
  end

  private
  
  def validate_rows
    if not voucher_rows.present? or voucher_rows.length == 0
      errors.add(:voucher_rows, :must_exist)
    else
      total_debit = 0
      total_credit = 0
      voucher_rows.each do |row|
        total_debit += row.debit.to_f
        total_credit += row.credit.to_f
      end
      if total_debit != total_credit
        errors.add(:voucher_rows, :must_balance)
      end
    end
  end
end
