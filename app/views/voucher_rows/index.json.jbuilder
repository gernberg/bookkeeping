json.array!(@voucher_rows) do |voucher_row|
  json.extract! voucher_row, :id, :account_id, :voucher_id, :sum
  json.url voucher_row_url(voucher_row, format: :json)
end
