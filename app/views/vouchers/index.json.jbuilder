json.array!(@vouchers) do |voucher|
  json.extract! voucher, :id, :title, :date, :fiscal_year_id, :number
end
