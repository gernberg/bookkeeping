json.array!(@accounts) do |account|
  json.extract! account, :id, :account_name, :account_number, :sru
end
