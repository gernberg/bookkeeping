require 'test_helper'

class FiscalYearsControllerTest < ActionController::TestCase
  setup do
    @fiscal_year = fiscal_years(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:fiscal_years)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create fiscal_year" do
    assert_difference('FiscalYear.count') do
      post :create, fiscal_year: { company_id_id: @fiscal_year.company_id_id, end_date: @fiscal_year.end_date, start_date: @fiscal_year.start_date }
    end

    assert_redirected_to fiscal_year_path(assigns(:fiscal_year))
  end

  test "should show fiscal_year" do
    get :show, id: @fiscal_year
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @fiscal_year
    assert_response :success
  end

  test "should update fiscal_year" do
    patch :update, id: @fiscal_year, fiscal_year: { company_id_id: @fiscal_year.company_id_id, end_date: @fiscal_year.end_date, start_date: @fiscal_year.start_date }
    assert_redirected_to fiscal_year_path(assigns(:fiscal_year))
  end

  test "should destroy fiscal_year" do
    assert_difference('FiscalYear.count', -1) do
      delete :destroy, id: @fiscal_year
    end

    assert_redirected_to fiscal_years_path
  end
end
