import React, { Component } from 'react';
import Pikaday from 'pikaday';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!pikaday/css/pikaday.css';
// import styles from './DatePicker.css';

class DatePicker extends Component {
  state = {
    value: ''
  }
  
  ref = React.createRef();
  
  componentDidMount = () => {
    const picker = new Pikaday({
      field: this.ref.current,
      format: 'DD/MM/YYYY',
      minDate: new Date(),
      onSelect: () => {
        this.setState({value: picker.toString()})
        console.log(this.state.value)
      },
      onOpen: () => {
        picker.setDate(null)
        this.setState({value: ''})
      }
    });

    if(this.props.initialValue !== null) {
      this.setState({value: this.props.initialValue})
      picker.setDate(this.props.initialValue);
    } else {
      picker.setDate(new Date());
    }
  }
  
  render() {
    return (
      <input type="text" name={this.props.name} onBlur={this.props.onChange} value={this.state.value} ref={this.ref} className={this.props.className} onChange={() => {}} />
    );
  }
}

export default DatePicker;