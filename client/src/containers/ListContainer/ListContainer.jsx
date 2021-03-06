import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
// import 'moment/locale/pl';

import styles from './ListContainer.css';
import * as actions from '../../store/actions/index';

import CategoryList from './CategoryList/CategoryList';
import ProductList from './ProductList/ProductList';
import FoodnoteList from './FoodnoteList/FoodnoteList';

class ListContainer extends PureComponent {

  state = {
    showCategoryMenu: false
  }

  componentDidMount() {
    if(this.props.categories.length === 0){
      this.props.fetchCategories();
    }
  }

  toggleCategoryMenu = () => {
    this.setState(prevState => ({showCategoryMenu: !prevState.showCategoryMenu}))
  }

  hideCategoryMenu = () => {
    this.setState({showCategoryMenu: false})
  }

  renderList = () => {
    let list = null;
    let opts = null;
    if(this.props.listType === 'products') {
      switch (this.props.subType) {
        case 'currentuser':
          document.title = 'My foods - calories.today'
          opts = { 
            title: "My foods",
            type: "user_foods"
          }
          break;
        case 'latest':
          document.title = 'Lately yummed - calories.today'
          opts = { 
            title: "Lately yummed",
            type: "latest_foods"
          }
          break;
        default:
          const { id, category } = this.props.location.state;
          document.title = `${category} products - calories.today`
          opts = { 
            title: category || null,
            type: "category_foods",
            categoryId: id
          }
          break;
      }
      list = <ProductList categoryMenuClicked={this.toggleCategoryMenu} fetchCategories={this.props.fetchCategories} {...opts} />
    } else {
      switch (this.props.subType) {
        case 'yesterday':
          document.title = 'Yesterday logs - calories.today'
          opts = { 
            title: "Yesterday",
            day: "yesterday"
          }
          break;
        case 'otherday':
          const { day } = this.props.computedMatch.params;
          const title = moment(day, 'YYYYMMDD').format("DD MMM YYYY");
          document.title = `${title} logs - calories.today`
          opts = { 
            title,
            day
          }
          break;
        default:
          document.title = 'Today logs - calories.today'
          opts = { 
            title: "Today",
            day: 'today'
          }
          break;
      }
      list = <FoodnoteList categoryMenuClicked={this.toggleCategoryMenu} fetchCategories={this.props.fetchCategories} {...opts} />
    }

    return (
      <React.Fragment>
        <CategoryList 
          categories={this.props.categories} 
          loading={this.props.categoriesLoading} 
          showMenu={this.state.showCategoryMenu} 
          hideMenuClicked={this.hideCategoryMenu} />
        {list}
      </React.Fragment>
    )
  }
  
  render() {
    let listContainer = this.renderList();

    return(
      <section className={styles['list__container']}>
        <div className={styles['list__wrapper']}>
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