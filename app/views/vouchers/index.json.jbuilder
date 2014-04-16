json.array!(@vouchers) do |voucher|
  json.extract! voucher, :id, :title, :date, :fiscal_year_id
  json.url voucher_url(voucher, format: :json)
end
