import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './EditArticle.css';
import * as actions from '../../store/actions/index';

import Form from '../../components/Form/Form';
import NoMatch from '../../components/Error/NoMatch';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class EditArticle extends Component {

  state = {
    fields: {
      title: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Article title',
          name: 'article[title]'
        },
        label: 'Article title',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Article description',
          name: 'article[description]'
        },
        label: 'Article description',
        validation: {
          required: true,
          minLength: 10
        },
        valid: false,
        touched: false
      },
      content: {
        elementType: 'tinymce',
        elementConfig: {
          placeholder: 'Article content',
          name: 'article[content]'
        },
        label: 'Article content',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      visible: {
        elementType: 'checkbox',
        elementConfig: {
          id: 'cb-visible',
          type: 'checkbox',
          name: 'article[visible]'
        },
        label: 'Visible',
        value: false,
        valid: true,
        touched: false
      },
      start_date: {
        elementType: 'datepicker',
        label: 'Publication date (optional)',
        elementConfig: {
          name: 'article[start_date]'
        },
        valid: true,
        touched: false
      },
      end_date: {
        elementType: 'datepicker',
        label: 'Publication end date (optional)',
        elementConfig: {
          name: 'article[end_date]'
        },
        valid: true,
        touched: false
      },
    },
    articleLoaded: false
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.props.onFetchArticle(articleId);
  }

  static getDerivedStateFromProps(props, state){
    if(state.articleLoaded) return state;
    if(!props.loading && props.article !== null){
      let updatedFields = { ...state.fields };
      for(let key in updatedFields){
        updatedFields = {
          ...updatedFields,
          [key]: {
            ...updatedFields[key],
            value: props.article[key],
            valid: true
          }
        }
      }
      return({fields: updatedFields, articleLoaded: true});
    }
    return state;
  }

  generateButton = () => {
    let button = <Button btnType="save">Save changes</Button>;
    if(this.props.loading) {
      button = <Button btnType="save loading">Generating goodness...</Button>;
    }
    return button;
  }

  generateErrorMsg = () => {
    let errorMessage = '';
    if(this.props.error instanceof Object){
      let errorFields = Object.keys(this.props.error);

      errorMessage = (
        <div className={styles.errorContainer}>
          { errorFields.map((field, index) => {
            let errorMsgs = this.props.error[field].map((err, key) => <li key={key}>- {err}</li>);
            return (
              <React.Fragment key={index}>
                <p className={styles.errorSubject}>{field}</p>
                <ul>
                  {errorMsgs}
                </ul>
              </React.Fragment>
            );
          })
        }
        </div>
      );
    } else {
      errorMessage = (
        <p>{this.props.error}</p>
      );
    }
    return errorMessage;
  }

  render() {
    let form = <Spinner />;
    let errorMessage = null;
    let button = null;
    
    if(this.state.articleLoaded){
      button = this.generateButton();
      if(this.props.error) {
        errorMessage = this.generateErrorMsg();
      }
      form = <Form 
        fields={this.state.fields} 
        entity={this.props.article} 
        loading={this.props.loading} 
        submitBtn={button}
        errors={errorMessage}
        submitHandler={this.props.onUpdateArticle} 
        formType="edit"
      />;
    } else if(this.props.error !== null) {
      form = <NoMatch />
    }

    return (
      <section className={styles['article-form']}>
        <div className={styles.wrapper}>
          <h1>Edit article:</h1>
          {form}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.article.error,
    loading: state.article.loading,
    article: state.article.article
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchArticle: (id) => dispatch(actions.fetchArticle(id)),
    onUpdateArticle: (formdata, id) => dispatch(actions.updateArticle(formdata, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);