import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ArticleListItem.css';
import * as actions from '../../../store/actions/index';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

class ArticleListItem extends Component {
  deleteArticle = () => {
    if(window.confirm('Are you sure you want to delete "'+this.props.article.title+'" article?')) {
      this.props.onDeleteArticle(this.props.article.id);
    }
  }

  renderArticleListItem = () => {
    return (
      <div key={this.props.article.id} className={styles['article']}>
        <h1 className={styles['article-title']}>{this.props.article.title}</h1>
        <p className={styles['article-description']}>{this.props.article.description}</p>
        <Link to={`/articles/${this.props.article.id}`} className={styles['article-link']}><Button>Read more...</Button></Link>
        <Link to={`/articles/${this.props.article.id}/edit`} className={styles['article-link']}><Button>Edit...</Button></Link>
        <Button btnType="delete" clicked={this.deleteArticle}>Delete</Button>
      </div>
    )
  }
  
  render() {
    const articleListItem = this.props.article.deleteInProgress ? <Spinner /> : this.renderArticleListItem();
    return articleListItem;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteArticle: id => dispatch(actions.deleteArticle(id)),
  }
}

export default connect(null, mapDispatchToProps)(ArticleListItem);