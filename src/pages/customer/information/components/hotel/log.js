import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ hotelInfo }) => ({
  hotelInfo,
}))
export default class Log extends Component {
  componentDidMount() {
    const { dispatch, customerId } = this.props;
    dispatch({
      type: 'hotelInfo/getOperationLogInfo',
      payload: {
        customerId,
      },
    });
  }

  render() {
    const {
      hotelInfo: { hotelLogInfos = [] },
    } = this.props;
    return (
      <div className={styles.tabContianer}>
        <div className={styles.logContainer}>
          {hotelLogInfos.map((item, index) => {
            const { bookingId, operationType, operationTime } = item;
            return (
              <div className={styles.logItem} key={index}>
                                  <div className={styles.logItemNext}>
                  <div className={styles.label}>User Name:</div>
                  <div className={styles.text}>{'admin' || '-'}</div>
                </div>
                <div className={styles.logItemNext}>
                  <div className={styles.label}>Booking ID:</div>
                  <div className={styles.text}>{bookingId || '-'}</div>
                </div>
                <div className={styles.logItemNext}>
                  <div className={styles.label}>Operation Type:</div>
                  <div className={styles.text}>{operationType || '-'}</div>
                </div>
                <div className={styles.logItemNext}>
                  <div className={styles.label}>Operation Time:</div>
                  <div className={styles.text}>{operationTime || '-'}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
