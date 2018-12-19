import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ArticleList.css';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

class ArticleList extends Component {

  componentDidMount() {
    this.props.onFetchArticles();
  }

  renderArticles() {
    if(this.props.error === null && this.props.articles.length > 0){
      return this.props.articles.map(article => {
        return(
          <div key={article.id} className={styles['article']}>
            <h1 className={styles['article-title']}>{article.title}</h1>
            <p className={styles['article-description']}>{article.description}</p>
            <a href="#" className={styles['article-link']}>Read more...</a>
          </div>
        )
      })
    } else {
      console.log('this.props.error: ',this.props.error)
      let button = <Button btnType="refresh" clicked={this.props.onFetchArticles}>Refresh</Button>
      if(this.props.loading) {
        button = <Button btnType="refresh loading">Refreshing...</Button>;
      }
      return (
        <div className={styles['error-container']}>
          <p className={styles['error-container__message']}>{this.props.error}</p>
          {button}
        </div>
      )
    }
  }
  
  render() {
    return (
      <section>
        <div className={styles['article-list']}>
          {(!this.props.loading)
            ? this.renderArticles()
            : <Spinner />
          }
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.article.articles,
    loading: state.article.loading,
    error: state.article.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchArticles: () => dispatch(actions.fetchArticles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);