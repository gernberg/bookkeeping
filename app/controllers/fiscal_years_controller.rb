class FiscalYearsController < ApplicationController
  before_action :set_fiscal_year, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!

  # GET /fiscal_years
  # GET /fiscal_years.json
  def index
    @fiscal_years = current_user.companies.find(params[:company_id]).fiscal_years.all
  end

  # GET /fiscal_years/1
  # GET /fiscal_years/1.json
  def show
    @fiscal_year = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:id])
  end

  # GET /fiscal_years/new
  def new
    @fiscal_year = FiscalYear.new
  end

  # GET /fiscal_years/1/edit
  def edit
    @fiscal_year = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:id])
  end

  # POST /fiscal_years
  # POST /fiscal_years.json
  def create
    @fiscal_year = FiscalYear.new(fiscal_year_params)
    @fiscal_year.company = current_user.companies.find(params[:company_id])

    respond_to do |format|
      if @fiscal_year.save
        format.html { redirect_to @fiscal_year, notice: 'Fiscal year was successfully created.' }
        format.json { render action: 'show', status: :created, location: @fiscal_year }
      else
        format.html { render action: 'new' }
        format.json { render json: @fiscal_year.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fiscal_years/1
  # PATCH/PUT /fiscal_years/1.json
  def update
    @fiscal_year = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:id])
    respond_to do |format|
      if @fiscal_year.update(fiscal_year_params)
        format.html { redirect_to @fiscal_year, notice: 'Fiscal year was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @fiscal_year.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fiscal_years/1
  # DELETE /fiscal_years/1.json
  def destroy
    @fiscal_year = current_user.companies.find(params[:company_id]).fiscal_years.find(params[:id])
    respond_to do |format|
      format.html { redirect_to fiscal_years_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fiscal_year
      @fiscal_year = FiscalYear.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fiscal_year_params
      params.require(:fiscal_year).permit(:start_date, :end_date, :company_id)
    end
end
