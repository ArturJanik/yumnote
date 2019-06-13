import React, { PureComponent } from 'react';
import styles from './Button.css';

export class Button extends PureComponent {
  render(){
    let btnType = this.props.btnType || 'regular';

    if(btnType.split(' ').length > 1){
      btnType = btnType.split(' ').join('--');
    }

    const selected = (this.props.selected) ? '--selected' : '';

    return (
      <button
        onClick={this.props.clicked}
        className={`${styles['btn--' + btnType + selected]}`}
        disabled={this.props.disabled}
      >{this.props.children}</button>
    )
  }
}

export default Button;