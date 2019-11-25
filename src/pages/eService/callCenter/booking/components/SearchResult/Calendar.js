import React, { Component } from 'react';
import CalendarShow from '@/components/Calendar';
import data from './data';
import styles from './index.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class Calendar extends Component {
  clickEvent = date => {
    console.log(date.format('YYYY-MM-DD'));
  };

  render() {
    const {
      result: { hotelInfos },
    } = data;
    return (
      <div className={styles.calendarContainer}>
        <CalendarShow
          clickEvent={this.clickEvent}
          data={hotelInfos}
          checkInDate="2019-11-23"
          checkOutDate="2019-12-25"
          month="2019-11"
        />
      </div>
    );
  }
}
