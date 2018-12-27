import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import { updateObject } from '../../shared/utility';
import { validateField, formIsValid } from '../../shared/form-validation';


class Form extends Component {
  state = {
    fields: {}
  }
  
  componentDidMount = () => {
    this.setState({fields: this.props.fields})
  }

  inputChangedHandler = (event, fieldName, fieldType) => {
    let value = null;

    // Adjusting value source if necessary (i.e. when value is returned by plugin)
    switch (fieldType) {
      case 'tinymce':
        value = event;
        break;
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
      this.props.submitHandler(data, this.props.entity.id);
    } else if(!formIsValid(this.state.fields)) {
      let updatedFields = {};
      for(let field in this.state.fields){
        updatedFields[field] = updateObject(this.state.fields[field], { touched: true });
      }
      updatedFields = updateObject(this.state.fields, updatedFields);
      this.setState({fields: updatedFields});
    }
  }

  renderFormFields = () => {
    const formElementsArray = [];
    for(let key in this.state.fields){
      formElementsArray.push({
        id: key,
        config: this.state.fields[key]
      });
    }

    let formFields = formElementsArray.map(formElement => {
      return <Input 
        key={formElement.id}
        elementName={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value || ''}
        label={formElement.config.label}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        customClasses={formElement.config.customClasses}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id, formElement.config.elementType)}
      />
    });

    return formFields;
  }
  
  render() {
    const formFields = this.renderFormFields();
    return (
      <form onSubmit={this.submitHandler}>
        {formFields}
        {this.props.submitBtn}
        {this.props.errors}
      </form>
    );
  }
}

export default Form;