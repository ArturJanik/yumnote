import React from 'react';
import styles from './Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import countryCodes from './country-codes-en';

import DatePicker from './DatePicker/DatePicker';
import TinyMce from './TinyMce/TinyMce';
import Select from 'react-select';

const input = (props) => {
  let inputElement = null;

  let inputClasses = [styles.inputElement];
  if(props.invalid && props.shouldValidate && props.touched) inputClasses.push(styles.invalid);
  if(props.customClasses && props.customClasses.length > 0) inputClasses.concat(styles[props.customClasses]);
  
  switch (props.elementType){
    case('input'):
      inputElement = (
        <div className={styles.inputWrapper}>
          <input 
          className={inputClasses.join(' ')} 
          {...props.elementConfig} value={props.value}
          onChange={props.changed} />
         </div>);
      break;
    case('checkbox'):
      inputElement = <input 
          className={inputClasses.join(' ')} 
          {...props.elementConfig} checked={props.value}
          onChange={props.changed} />;
      break;
    case('textarea'):
      inputElement = (
        <div className={styles.inputWrapper}>
          <textarea 
          className={inputClasses.join(' ')} 
          {...props.elementConfig} value={props.value}
          onChange={props.changed} />
         </div>);
      break;
    case('countryselect'):
      const val = countryCodes.find(option => option.value === props.value) || null;
      inputElement = (
        <Select 
          className={inputClasses.join(' ')}
          options={countryCodes}
          value={val}
          name={props.elementConfig.name}
          styles={{
            menu: (base, state) => ({
              ...base,
              left: 0,
              right: 0,
              marginTop: 0,
              zIndex: 20
            }),
            container: (base, state) => ({
              ...base,
              marginBottom: 10,
            }),
          }}
          onChange={props.changed}
        />
      );
      break;
    case('select'):
      inputElement = (
        <select 
          className={inputClasses.join(' ')} 
          value={props.value}
          name={props.elementConfig.name}
          onChange={props.changed}
          >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;
    case('tinymce'):
      inputClasses.push(styles.tinymceWrapper);
      let classes = inputClasses.join(' ');
      inputElement = (
        <div className={classes}>
          <TinyMce 
            value={props.value}
            fieldName={props.elementConfig.name}
            onChange={props.changed}
          />
        </div>);
        break;
    case('datepicker'):
      inputElement = (
      <div className={styles.inputWrapper}>
        <DatePicker
          name={props.elementConfig.name}
          className={inputClasses.join(' ')} 
          initialValue={props.value}
          onChange={props.changed} 
        />
        <span><FontAwesomeIcon icon="calendar-alt" /></span>
      </div>);
      break;
    default:
      inputElement = <input 
         className={inputClasses.join(' ')} 
         {...props.elementConfig} value={props.value}
         onChange={props.changed} />;
      break;
  }
  
  switch (props.elementType){
    case('radio'):
    case('checkbox'):
      return(
        <div className={[styles.input, styles['field_'+props.elementName], styles['type_'+props.elementType]].join(' ')}>
          {inputElement}
          { props.label ? <label className={styles.label} htmlFor={props.elementConfig.id}>{props.label}</label> : `Error: ${props.elementName} requires label` }
        </div>
      )
    default:
      return(
        <div className={[styles.input, styles['field_'+props.elementName], styles['type_'+props.elementType]].join(' ')}>
          { props.label ? <label className={styles.label}>{props.label}</label> : null }
          {inputElement}
        </div>
      )
  }
};

export default input;