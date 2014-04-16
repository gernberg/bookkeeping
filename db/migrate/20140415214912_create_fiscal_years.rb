class CreateFiscalYears < ActiveRecord::Migration
  def change
    create_table :fiscal_years do |t|
      t.date :start_date
      t.date :end_date
      t.references :company_id, index: true

      t.timestamps
    end
  end
end
