import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import { updateObject } from '../../utilities/utility';
import { validateField, formIsValid } from '../../utilities/form-validation';
import './Form.css';

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
    if(this.props.loading) return;

    let fieldsToValidate = {};
    for(let field in this.state.fields){
      if(this.state.fields[field].validation === undefined) continue;
      
      const fieldFormType = this.state.fields[field].formType;
      if(fieldFormType !== undefined && fieldFormType !== this.props.formType) continue;

      fieldsToValidate[field] = this.state.fields[field];
    }
    
    if(!this.props.loading && formIsValid(fieldsToValidate)){
      let data = new FormData(event.target);
      if(this.props.formType === 'edit') {
        this.props.submitHandler(data, this.props.entity.id);
      } else {
        this.props.submitHandler(data);
      }
    } else if(!formIsValid(fieldsToValidate)) {
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



    for(let field in this.state.fields){
      const fieldFormType = this.state.fields[field].formType;
      if(fieldFormType !== undefined && fieldFormType !== this.props.formType) continue;
      if(this.state.fields[field].elementType === undefined) continue;

      let validity = this.state.fields[field].valid;
      if(this.state.fields[field].confirms !== undefined){
        const confirmed = this.state.fields[this.state.fields[field].confirms].value;
        const confirmed_by = this.state.fields[field].value;
        validity = (confirmed === confirmed_by && confirmed_by.length > 0);
      }

      formElementsArray.push({
        id: field,
        config: { ...this.state.fields[field], valid: validity }
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