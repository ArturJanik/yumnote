import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
// import 'moment/locale/pl';

import styles from './ListContainer.css';
import * as actions from '../../store/actions/index';

import CategoryList from './CategoryList/CategoryList';
import ProductList from './ProductList/ProductList';
import FoodnoteList from './FoodnoteList/FoodnoteList';

class ListContainer extends Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderList = () => {
    let list = null;
    switch (this.props.subType) {
      case 'currentuser':
        list = <ProductList 
          title="My foods"
        />
        break;
      case 'latest':
        list = <ProductList 
          title="Lately yummed"
        />
        break;
      case 'yesterday':
        list = <FoodnoteList 
          title="Yesterday"
          day="yesterday"
        />
        break;
      case 'otherday':
        const { day } = this.props.computedMatch.params;
        const title = moment(day, 'YYYYMMDD').format("DD MMM YYYY");
        list = <FoodnoteList 
          title={title}
          day={day}
        />
        break;
      default:
        list = <FoodnoteList 
          title="Today"
        />
        break;
    }

    return (
      <React.Fragment>
        <CategoryList categories={this.props.categories} />
        {list}
      </React.Fragment>
    )
  }
  
  render() {
    let listContainer = this.renderList();

    return(
      <section className={styles['list-container']}>
        <div className={styles.wrapper}>
          {listContainer}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    categoriesLoading: state.category.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(actions.fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);