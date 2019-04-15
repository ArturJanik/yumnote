class DocumentsController < ApiController
  before_action :document_params

  def show
    document = Document.find_by slug: params[:slug], visible: true
    if document
      render json: { document: document }
    else
      errors = { errors: { document: ['Not found']}}
      render json: errors, status: 404
    end
  end

  private
  def document_params
    params.permit(:slug, :visible)
  end
end