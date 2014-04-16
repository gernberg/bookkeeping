class CreateVoucherRows < ActiveRecord::Migration
  def change
    create_table :voucher_rows do |t|
      t.references :account, index: true
      t.references :voucher, index: true
      t.float :sum

      t.timestamps
    end
  end
end
