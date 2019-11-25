import React, { Component } from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import styles from './index.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  componentDidMount() {
    const week = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
    const weeks = document.getElementsByClassName('ant-fullcalendar-column-header-inner');
    for (let i = 0; i < weeks.length; i += 1) {
      weeks[i].textContent = week[i];
    }
  }

  dateFullCellRender = value => {
    const { data, checkInDate, checkOutDate, clickEvent } = this.props;
    // console.log(value, data);
    let DateInfo = () => <div></div>;
    let isSoldOut = false;
    let bgColor = '#fff';
    let textColor = '#565656';
    let price;
    let LeftContent = () => <div style={{ position: 'absolute' }}></div>;
    const day = value.format('DD');
    const dateNow = value.format('YYYY-MM-DD');
    data.forEach(item => {
      const { leftRoomCount, dateInfo, price: matchPrice } = item;
      const compareDate = moment(dateInfo).format('YYYY-MM-DD');
      if (compareDate === dateNow) {
        price = matchPrice ? `$${matchPrice}` : null;
        if (leftRoomCount === 0) {
          isSoldOut = true;
          textColor = 'rgb(117, 119, 123)';
        }
      }
    });
    if (dateNow === checkInDate || dateNow === checkOutDate) {
      bgColor = 'rgb(34, 180, 0)';
      textColor = '#fff';
    } else if (value > moment(checkInDate) && value < moment(checkOutDate)) {
      bgColor = 'rgb(233, 255, 227)';
    }
    if (
      (dateNow === checkInDate || (value > moment(checkInDate) && value < moment(checkOutDate))) &&
      value.format('ddd') !== 'Sat'
    ) {
      LeftContent = () => <div className={styles.leftBg}></div>;
    }
    if (isSoldOut === false) {
      switch (dateNow) {
        case checkInDate:
          DateInfo = () => <div className="iconfont">&#xe675;</div>;
          break;
        case checkOutDate:
          DateInfo = () => <div className="iconfont">&#xe676;</div>;
          break;
        default:
          break;
      }
    } else {
      DateInfo = () => <div className={styles.button}>SOLD OUT</div>;
    }
    return (
      <div
        className={styles.dateInner}
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={() => {
          clickEvent(value);
        }}
      >
        <LeftContent />
        <div className={styles.dateInfo}>
          <DateInfo />
          <div>{day}</div>
        </div>
        <div className={styles.price}>{price}</div>
      </div>
    );
  };

  render() {
    const { month } = this.props;
    return (
      <div className={styles.container}>
        <Calendar
          className={styles.calendar}
          dateFullCellRender={this.dateFullCellRender}
          value={moment(month)}
        />
      </div>
    );
  }
}
