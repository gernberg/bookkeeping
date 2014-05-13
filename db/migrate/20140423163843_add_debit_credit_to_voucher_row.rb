class AddDebitCreditToVoucherRow < ActiveRecord::Migration
  def change
    add_column :voucher_rows, :debit, :float
    add_column :voucher_rows, :credit, :float
  end
end
