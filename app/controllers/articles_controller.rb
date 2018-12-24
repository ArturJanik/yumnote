class ArticlesController < ApiController
  def index
    articles = Article.all
    render json: { articles: articles }
  end

  def show
    article = Article.find_by id: params[:id]
    if article
      render json: { article: article }
    else
      errors = { errors: { details: { articles: ['Not found']}}}
      render json: errors, status: 404
    end
  end

  def create
    article = Article.new(article_params)
    
    if article.save
      render json: {
        message: 'ok',
        article: article
      }
    else
      render json: { errors: article.errors }, status: 400
    end
  end

  def update
    article = Article.find(params['id'])

    if article.update(article_params)
      render json: {
        message: 'ok',
        article: article
      }
    else
      render json: { errors: article.errors }, status: 400
    end
  end

  private
  def article_params
    params.require(:article).permit(:title, :description, :content, :start_date, :end_date, :status)
  end
end
