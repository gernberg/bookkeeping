class CreateCompaniesUsers < ActiveRecord::Migration
  def change
    create_table :companies_users do |t|
      t.integer :company_id
      t.integer :user_id
    end
  end
end
