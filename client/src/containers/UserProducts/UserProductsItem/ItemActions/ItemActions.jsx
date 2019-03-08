import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemActions.css';

class ItemActions extends PureComponent {
  render(){
    const id = this.props.productId;
    return(
      <React.Fragment>
        <Link className={styles['link--edit']} to={`/products/${id}/edit`} title="Edit this product">edit</Link>
        <span className={styles['link--delete']} onClick={this.props.onDelete}>delete</span>
      </React.Fragment>
    )
  }
}

export default ItemActions;