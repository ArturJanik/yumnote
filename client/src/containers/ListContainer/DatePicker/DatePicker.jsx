import React, { Component } from 'react';
import Pikaday from 'pikaday';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!pikaday/css/pikaday.css';
import * as moment from 'moment';

// import styles from './DatePicker.css';

class DatePicker extends Component {
  datePickerRef = React.createRef();

  componentDidMount() {
    this.initializeDatePicker();
  }

  initializeDatePicker = () => {
    const picker = new Pikaday({
      field: this.datePickerRef.current,
      format: 'DD/MM/YYYY',
      maxDate: new Date(),
      onSelect: () => {
        const date = moment(picker.toString(), 'DD/MM/YYYY').format("YYYYMMDD");
        this.props.onDateSelected(date)
        // this.props.history.push(`/foodnotes/${date}`);
        // this.setState({ otherDaySelected: true });
      }
    });
  }

  render(){
    return (
      <div {...this.props} ref={this.datePickerRef}>{this.props.children}</div>
    )
  }
}

export default DatePicker;