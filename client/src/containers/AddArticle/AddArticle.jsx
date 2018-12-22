import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './AddArticle.css';
import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject } from '../../shared/utility';
import { validateField, formIsValid } from '../../shared/form-validation';

class AddArticle extends Component {

  state = {
    fields: {
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Article title',
          name: 'article[title]'
        },
        label: 'Article title',
        value: '',
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
        value: '',
        validation: {
          required: true,
          minLength: 10
        },
        valid: false,
        touched: false,
      },
      content: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Article content',
          name: 'article[content]'
        },
        label: 'Article content',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      status: {
        elementType: 'checkbox',
        elementConfig: {
          id: 'cb-status',
          type: 'checkbox',
          name: 'article[status]'
        },
        label: 'Status',
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
        value: '',
        valid: true,
        touched: false
      },
      end_date: {
        elementType: 'datepicker',
        label: 'Publication end date (optional)',
        elementConfig: {
          name: 'article[end_date]'
        },
        value: '',
        valid: true,
        touched: false
      },
    }
  }

  inputChangedHandler = (event, fieldName, fieldType) => {
    let value = null;

    // Adjusting value source if necessary (i.e. when value is returned by plugin)
    switch (fieldType) {
      case 'checkbox':
        value = event.target.checked;
        break;
      case 'countryselect':
        value = event.value;
        break;
      default:
        value = event.target.value;
        break;
    }
    
    const updatedFields = updateObject(this.state.fields,{
      [fieldName]: updateObject(this.state.fields[fieldName], {
        value: value,
        valid: validateField(value, this.state.fields[fieldName].validation),
        touched: true
      })
    });
    this.setState({fields: updatedFields});
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    if(!this.props.loading && formIsValid(this.state.fields)){
      let data = new FormData(event.target);
      this.props.onAddArticle(data);
    } else if(!formIsValid(this.state.fields)) {
      let updatedFields = {};
      for(let field in this.state.fields){
        updatedFields[field] = updateObject(this.state.fields[field], { touched: true });
      }
      updatedFields = updateObject(this.state.fields, updatedFields);
      this.setState({fields: updatedFields});
    }
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.fields){
      formElementsArray.push({
        id: key,
        config: this.state.fields[key]
      });
    }

    let form = formElementsArray.map(formElement => {
      if(formElement.config.signupOnly) return '';
      return <Input 
        key={formElement.id}
        elementName={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.config.label}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        customClasses={formElement.config.customClasses}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id, formElement.config.elementType)}
      />
    });

    let errorMessage = null;
    
    if(this.props.error) {
      console.log(this.props.error);
      if(this.props.error instanceof Object){
        let errorFields = Object.keys(this.props.error);
        errorMessage = '';
        
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
    }
    
    let button = <Button btnType="save">Save article</Button>
    if(this.props.loading) {
      button = <Button btnType="save loading">Generating goodness...</Button>;
    }

    return (
      <section className={styles['article-form']}>
        <div className={styles.wrapper}>
          <h1>Create new article:</h1>
          <form
            onSubmit={this.submitHandler}>
            {form}
            {errorMessage}
            {button}
          </form>
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