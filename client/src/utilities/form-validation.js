export const validateField = (value, rules) => {
  let isValid = true;
  if ( !rules ) {
    return true;
  }

  const notRequiredAndEmpty = !rules.required && value.trim() === '';

  if(rules.required){
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.minLength){
    isValid = (notRequiredAndEmpty) ? isValid : (value.length >= rules.minLength && isValid);
  }

  if(rules.maxLength){
    isValid = (notRequiredAndEmpty) ? isValid : (value.length <= rules.maxLength && isValid);
  }

  if(rules.isEmail){
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = (notRequiredAndEmpty) ? isValid : (pattern.test(value) && isValid);
  }

  if(rules.isNumeric){
    const pattern = /^[^\D]\d{0,9}((\.|,)\d{1,})?$/;
    isValid = (notRequiredAndEmpty) ? isValid : (pattern.test(value) && isValid);
  }

  return isValid;
}

export const formIsValid = (form) => {
  var valid = true;

  var formFields = Object.keys(form);
  formFields.forEach(fieldName => {
    if(!form[fieldName].valid) valid = false;
  });
  return valid;
}