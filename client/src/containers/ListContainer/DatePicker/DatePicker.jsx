import React, { PureComponent } from 'react';
import Pikaday from 'pikaday';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!pikaday/css/pikaday.css';
import moment from 'moment-timezone/builds/moment-timezone-with-data-2012-2022.min';

// import styles from './DatePicker.css';

class DatePicker extends PureComponent {
  datePickerRef = React.createRef();

  componentDidMount() {
    this.initializeDatePicker();
  }

  initializeDatePicker = () => {
    const picker = new Pikaday({
      field: this.datePickerRef.current,
      format: 'DD/MM/YYYY',
      maxDate: moment().add(1, 'days').toDate(),
      onSelect: () => {
        let date = moment(picker.toString(), 'DD/MM/YYYY').format("YYYYMMDD");
        if(this.props.timezone !== undefined){
          date = moment(picker.toString(), 'DD/MM/YYYY').tz(this.props.timezone).format("YYYYMMDD");
        }
        this.props.onDateSelected(date);
      }
    });
  }

  render(){
    return (
      <div className={this.props.className} ref={this.datePickerRef}>{this.props.children}</div>
    )
  }
}

export default DatePicker;