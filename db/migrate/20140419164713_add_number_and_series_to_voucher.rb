class AddNumberAndSeriesToVoucher < ActiveRecord::Migration
  def change
    add_column :vouchers, :number, :integer
    add_column :vouchers, :series, :string
  end
end
