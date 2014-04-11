class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :account_name
      t.integer :account_number
      t.integer :sru

      t.timestamps
    end
  end
end
