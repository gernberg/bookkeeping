json.array!(@fiscal_years) do |fiscal_year|
  json.extract! fiscal_year, :id, :start_date, :end_date, :company_id
  json.url fiscal_year_url(fiscal_year, format: :json)
end
