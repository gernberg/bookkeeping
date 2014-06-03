class AccountsController < ApplicationController
  before_action :set_account, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!

  # GET /accounts
  # GET /accounts.json
  def index
    @accounts = current_user.companies.find(params[:company_id]).accounts
    if params[:fiscal_year_id].present?
      @fiscal_year = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:fiscal_year_id])
      @accounts = @accounts.joins(:voucher_rows).joins(:vouchers).select("accounts.*, (coalesce(sum(voucher_rows.debit), 0) - coalesce(sum(voucher_rows.credit), 0)) AS sum").where("fiscal_year_id = ?", @fiscal_year.id).group("accounts.id")
    end
    respond_to do |format|
      format.html 
      format.json { render_with_protection @accounts }
    end
  end

  # GET /accounts/1
  # GET /accounts/1.json
  def show
    respond_to do |format|
      format.html 
      format.json { render_with_protection @account }
    end
  end

  # GET /accounts/new
  def new
    @account = Account.new
  end

  # GET /accounts/1/edit
  def edit
  end

  # POST /accounts
  # POST /accounts.json
  def create
    @account = Account.new(account_params)
    @account.company_id = current_user.companies.find(params[:company_id]).id

    respond_to do |format|
      if @account.save
        format.html { redirect_to @account, notice: 'Account was successfully created.' }
        format.json { render_with_protection action: 'show', status: :created, location: @account }
      else
        format.html { render action: 'new' }
        format.json { render_with_protection json: @account.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /accounts/1
  # PATCH/PUT /accounts/1.json
  def update
    respond_to do |format|
      if @account.update(account_params)
        format.html { redirect_to @account, notice: 'Account was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @account.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /accounts/1
  # DELETE /accounts/1.json
  def destroy
    @account.destroy
    respond_to do |format|
      format.html { redirect_to accounts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_account
      @account = Account.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def account_params
      params.require(:account).permit(:account_name, :account_number, :sru, :company_id)
    end
end
