class CreateVouchers < ActiveRecord::Migration
  def change
    create_table :vouchers do |t|
      t.string :title
      t.date :date
      t.references :fiscal_year, index: true

      t.timestamps
    end
  end
end
