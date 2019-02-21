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
    let opts = null;
    if(this.props.listType === 'products') {
      switch (this.props.subType) {
        case 'currentuser':
          opts = { 
            title: "My foods",
            type: "user_foods"
          }
          break;
        case 'latest':
          opts = { 
            title: "Lately yummed",
            type: "latest_foods"
          }
          break;
        default:
          const { id } = this.props.location.state;
          opts = { 
            title: this.props.location.state.category || null,
            type: "category_foods",
            categoryId: id
          }
          break;
      }
      list = <ProductList {...opts} />
    } else {
      switch (this.props.subType) {
        case 'yesterday':
          opts = { 
            title: "Yesterday",
            day: "yesterday"
          }
          break;
        case 'otherday':
          const { day } = this.props.computedMatch.params;
          const title = moment(day, 'YYYYMMDD').format("DD MMM YYYY");
          opts = { 
            title,
            day
          }
          break;
        default:
          opts = { 
            title: "Today"
          }
          break;
      }
      list = <FoodnoteList {...opts} />
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