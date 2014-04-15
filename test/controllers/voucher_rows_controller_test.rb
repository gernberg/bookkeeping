require 'test_helper'

class VoucherRowsControllerTest < ActionController::TestCase
  setup do
    @voucher_row = voucher_rows(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:voucher_rows)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create voucher_row" do
    assert_difference('VoucherRow.count') do
      post :create, voucher_row: { account_id: @voucher_row.account_id, sum: @voucher_row.sum, voucher_id: @voucher_row.voucher_id }
    end

    assert_redirected_to voucher_row_path(assigns(:voucher_row))
  end

  test "should show voucher_row" do
    get :show, id: @voucher_row
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @voucher_row
    assert_response :success
  end

  test "should update voucher_row" do
    patch :update, id: @voucher_row, voucher_row: { account_id: @voucher_row.account_id, sum: @voucher_row.sum, voucher_id: @voucher_row.voucher_id }
    assert_redirected_to voucher_row_path(assigns(:voucher_row))
  end

  test "should destroy voucher_row" do
    assert_difference('VoucherRow.count', -1) do
      delete :destroy, id: @voucher_row
    end

    assert_redirected_to voucher_rows_path
  end
end
