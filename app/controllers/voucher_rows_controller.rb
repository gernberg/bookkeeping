class VoucherRowsController < ApplicationController
  before_action :set_voucher_row, only: [:show, :edit, :update, :destroy]

  # GET /voucher_rows
  # GET /voucher_rows.json
  def index
    @voucher_rows = VoucherRow.all
  end

  # GET /voucher_rows/1
  # GET /voucher_rows/1.json
  def show
  end

  # GET /voucher_rows/new
  def new
    @voucher_row = VoucherRow.new
  end

  # GET /voucher_rows/1/edit
  def edit
  end

  # POST /voucher_rows
  # POST /voucher_rows.json
  def create
    @voucher_row = VoucherRow.new(voucher_row_params)

    respond_to do |format|
      if @voucher_row.save
        format.html { redirect_to @voucher_row, notice: 'Voucher row was successfully created.' }
        format.json { render action: 'show', status: :created, location: @voucher_row }
      else
        format.html { render action: 'new' }
        format.json { render json: @voucher_row.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /voucher_rows/1
  # PATCH/PUT /voucher_rows/1.json
  def update
    respond_to do |format|
      if @voucher_row.update(voucher_row_params)
        format.html { redirect_to @voucher_row, notice: 'Voucher row was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @voucher_row.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /voucher_rows/1
  # DELETE /voucher_rows/1.json
  def destroy
    @voucher_row.destroy
    respond_to do |format|
      format.html { redirect_to voucher_rows_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_voucher_row
      @voucher_row = VoucherRow.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def voucher_row_params
      params.require(:voucher_row).permit(:account_id, :voucher_id, :sum)
    end
end
