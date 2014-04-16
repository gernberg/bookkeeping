class ChangeCompanyIdIdtoCompanyIdForFiscalYears < ActiveRecord::Migration
  def change
    rename_column :fiscal_years, :company_id_id, :company_id
  end
end
