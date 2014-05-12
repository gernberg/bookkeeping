class VouchersController < ApplicationController
  before_action :set_voucher, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!

  # GET /vouchers
  # GET /vouchers.json
  def index
    sleep(1)
    @vouchers = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:fiscal_year_id]).vouchers
  end

  # GET /vouchers/1
  # GET /vouchers/1.json
  def show
  end

  # GET /vouchers/new
  def new
    @voucher = Voucher.new
  end

  # GET /vouchers/1/edit
  def edit
  end

  # POST /vouchers
  # POST /vouchers.json
  def create
    params[:voucher][:voucher_rows_attributes] = params[:voucher_rows_attributes]
    @voucher = Voucher.new(voucher_params)
    @voucher.fiscal_year = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:fiscal_year_id])

    respond_to do |format|
      if @voucher.save
        format.html { redirect_to @voucher, notice: 'Voucher was successfully created.' }
        format.json { render action: 'show', status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @voucher.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /vouchers/1
  # PATCH/PUT /vouchers/1.json
  def update
    respond_to do |format|
      if @voucher.update(voucher_params)
        format.html { redirect_to @voucher, notice: 'Voucher was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @voucher.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /vouchers/1
  # DELETE /vouchers/1.json
  def destroy
    @voucher.destroy
    respond_to do |format|
      format.html { redirect_to vouchers_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
  def set_voucher
    @voucher = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:fiscal_year_id]).vouchers.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def voucher_params
    params.require(:voucher).permit(:title, :date, :fiscal_year_id, :voucher_rows_attributes=>[:account_id, :debit, :credit])
  end
end
