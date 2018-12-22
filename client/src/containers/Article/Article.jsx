import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Article.css';
import * as actions from '../../store/actions/index';

import NoMatch from '../../components/Error/NoMatch';
import Spinner from '../../components/UI/Spinner/Spinner';

class Article extends Component {

  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.props.onFetchArticle(articleId);
  }

  renderArticle() {
    const article = this.props.article;
    return (
      <React.Fragment>
        <div className={styles['article-header']}>
          <a href={article.link} target="_blank" rel="noopener noreferrer" className={styles['article-image']}><img src="" alt={article.title} /></a>
          <h1>{article.title}</h1>
        </div>
        <div className={styles['article-content']} dangerouslySetInnerHTML={{__html: article.content}}></div>
        <div className={styles['article-footer']}>Author, Comments</div>
      </React.Fragment>
    )
  }

  render() {
    let article = <Spinner />;
    
    if(!this.props.loading && this.props.article !== null){
      article = this.renderArticle();
    } else if(this.props.error !== null) {
      article = <NoMatch />
    }

    return (
      <section>
        <div className={styles['article-single']}>
          {article}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.article.error,
    article: state.article.article,
    loading: state.article.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchArticle: (id) => dispatch(actions.fetchArticle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);