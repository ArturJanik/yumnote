import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './AddArticle.css';
import * as actions from '../../store/actions/index';

import Form from '../../components/Form/Form';
import Button from '../../components/UI/Button/Button';

class AddArticle extends Component {

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
        touched: false,
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
        touched: false,
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
    }
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
    let button = this.generateButton();
    let errorMessage = null;
    if(this.props.error) {
      console.log(this.props.error);
      errorMessage = this.generateErrorMsg();
    }

    let form = <Form 
      fields={this.state.fields}
      loading={this.props.loading} 
      submitBtn={button}
      errors={errorMessage}
      submitHandler={this.props.onAddArticle} 
    />;

    return (
      <section className={styles['article-form']}>
        <div className={styles.wrapper}>
          <h1>Create new article:</h1>
          {form}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.article.error,
    loading: state.article.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddArticle: formdata => dispatch(actions.addArticle(formdata)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);