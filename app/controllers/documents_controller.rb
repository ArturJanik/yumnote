class DocumentsController < ApiController
  before_action :require_login

  def show
    document = Document.find(params[:id])
    if document
      render json: { document: document }
    else
      errors = { errors: { document: ['Not found']}}
      render json: errors, status: 404
    end
  end

  private
  def document_params
    params.require(:document).permit(:title, :content, :short_content, :visible)
  end
end