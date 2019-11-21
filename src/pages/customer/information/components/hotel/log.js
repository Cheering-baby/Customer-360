import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Spin, Row, Col, Select, DatePicker, Button } from 'antd';
import styles from './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
@connect(({ hotelInfo, loading }) => ({
  hotelInfo,
  searchLoading: loading.effects['hotelInfo/getOperationLogInfo'],
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

  search = () => {
    const {
      dispatch,
      customerId,
      hotelInfo: { dateFrom, dateTo, operationType },
    } = this.props;
    dispatch({
      type: 'hotelInfo/getOperationLogInfo',
      payload: {
        customerId,
        operationType,
        dateFrom: moment(dateFrom).format('x'),
        dateTo: moment(dateTo).format('x'),
      },
    });
  };

  changeOperationType = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotelInfo/save',
      payload: {
        operationType: value,
      },
    });
  };

  changeDate = (_, dateString) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'hotelInfo/save',
      payload: {
        dateFrom: dateString[0],
        dateTo: dateString[1],
      },
    });
  };

  render() {
    const {
      searchLoading,
      hotelInfo: { hotelLogInfos = [], operationType },
    } = this.props;
    return (
      <div className={styles.tabContianer}>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={9} className={styles.operationTypeSelect}>
            <div style={{ marginRight: '10px' }}>Operation Type</div>
            <Select
              style={{ width: '200px' }}
              placeholder="Please Select"
              onChange={this.changeOperationType}
            >
              <Option value="CreateBooking">CreateBooking</Option>
              <Option value="CancelBooking">CancelBooking</Option>
              <Option value="SendConfirmationEmail">SendConfirmationEmail</Option>
              <Option value="SendCancellationEmail">SendCancellationEmail</Option>
            </Select>
          </Col>
          <Col span={12} className={styles.operationTimeSelect}>
            <div style={{ marginRight: '10px' }}>Operation Time</div>
            <RangePicker
              format={dateFormat}
              style={{ width: '250px' }}
              onChange={this.changeDate}
            />
          </Col>
          <Button type="primary" onClick={this.search}>
            Search
          </Button>
        </Row>
        <Spin spinning={searchLoading}>
          <div className={styles.logContainer}>
            {hotelLogInfos.map((item, index) => {
              // eslint-disable-next-line no-shadow
              const { bookingId, operationType, operationTime } = item;
              return (
                // eslint-disable-next-line react/no-array-index-key
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
        </Spin>
      </div>
    );
  }
}
