import React, {PureComponent} from 'react';
import Button from '../../../../components/UI/Button/Button';

class ChartButton extends PureComponent {
  onButtonClick = () => {
    this.props.clicked(this.props.type)
  }

  render(){
    const {type, selected, children, disabled} = this.props;
    return (
      <Button selected={type === selected} disabled={disabled} clicked={this.onButtonClick}>{children}</Button>
    )
  }
}

export default ChartButton;