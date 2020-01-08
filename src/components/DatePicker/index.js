import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

export default class DatePickerExtend extends Component {
  render() {
    const { value, item } = this.props;
    return (
      <div className={styles.container}>
        <DatePicker {...item} />
      </div>
    );
  }
}
