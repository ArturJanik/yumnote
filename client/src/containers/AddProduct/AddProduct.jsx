import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './AddProduct.css';
import * as actions from '../../store/actions/index';

import Form from '../../components/Form/Form';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class AddProduct extends Component {

  componentDidMount() {
    document.title = 'Create new product - calories.today'
    this.props.fetchCategories()
  }

  generateFields = () => {
    const categoriesOptions = this.props.categories.map(cat => ({
      value: cat.id, displayValue: cat.name
    }))
    return {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Product name',
          name: 'product[name]'
        },
        label: 'Product name',
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      spacing: { elementType: 'spacing' },
      unit: {
        elementType: 'select',
        elementConfig: {
          name: 'product[unit]',
          options: [
            { value: 'g', displayValue: 'g'},
            { value: 'oz', displayValue: 'oz'},
            { value: 'ml', displayValue: 'ml'},
            { value: 'floz', displayValue: 'floz'},
            { value: 'pcs', displayValue: 'pcs'},
          ]
        },
        label: 'Units',
        valid: true,
        touched: false
      },
      spacing2: { elementType: 'spacing' },
      amount: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Product amount referred by macronutrient values',
          name: 'product[amount]'
        },
        label: 'Amount (units)',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      kcal: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'kcal per amount',
          name: 'product[kcal]'
        },
        label: 'Calories',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      carb: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'g of carbs per amount',
          name: 'product[carb]'
        },
        label: 'Carbohydrates (g)',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      fat: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'g of fat per amount',
          name: 'product[fat]'
        },
        label: 'Fats (g)',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      prot: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'g of prot per amount',
          name: 'product[prot]'
        },
        label: 'Proteins (g)',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      spacing3: { elementType: 'spacing' },
      category: {
        elementType: 'select',
        elementConfig: {
          name: 'product[category_id]',
          options: categoriesOptions
        },
        validation: {
          required: true,
        },
        label: 'Category',
        valid: true,
        touched: false
      }
    }
  }

  generateButton = () => {
    let button = <Button btnType="save">Save product</Button>;
    if(this.props.loading) {
      button = <Button btnType="save loading">Saving...</Button>;
    }
    return button;
  }

  generateErrorMsg = () => {
    let errorMessage = '';
    if(this.props.error instanceof Object){
      let errorFields = Object.keys(this.props.error);

      errorMessage = (
        <div className={styles['error-container']}>
          { errorFields.map((field, index) => {
            let errorMsgs = this.props.error[field].map((err, key) => <li key={key}>- {err}</li>);
            return (
              <React.Fragment key={index}>
                <p className={styles['error-subject']}>{field}</p>
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
        <div className={styles['error-container']}>
          <p>{this.props.error}</p>
        </div>
      );
    }
    return errorMessage;
  }

  render() {
    let form = <Spinner />;
    if(!this.props.categoriesLoading && this.props.categories.length > 0){
      let button = this.generateButton();
      let errorMessage = null;
      if(this.props.error) {
        errorMessage = this.generateErrorMsg();
      }
  
      form = <Form 
        fields={this.generateFields()}
        loading={this.props.loading} 
        submitBtn={button}
        errors={errorMessage}
        submitHandler={this.props.onAddProduct} 
      />;
    }

    return (
      <section className={styles['product-form']}>
        <div className={styles.wrapper}>
          <h1>Create new product:</h1>
          {form}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.product.error,
    loading: state.product.loading,
    categories: state.category.categories,
    categoriesLoading: state.category.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: formdata => dispatch(actions.addProduct(formdata)),
    fetchCategories: () => dispatch(actions.fetchCategories(true)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);