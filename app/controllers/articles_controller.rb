class ArticlesController < ApiController
  def index
    articles = Article.all
    render json: { articles: articles }
  end

  private
  def article_params
    params.require(:article).permit(:title, :description, :content, :start_date, :end_date, :status)
  end
end
