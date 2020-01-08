import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import HotelResult from './HotelResult';
import NoRecord from './NoRecord';
import styles from './index.less';

@connect(({ eServiceBookingMgr }) => ({ offerType: eServiceBookingMgr.offerType }))
export default class Index extends Component {
  render() {
    const { offerType } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <div className={styles.orderBtn}>
          <Button type="primary">
            <Icon type="shopping-cart" style={{ fontSize: '20px' }} /> My Order
          </Button>
        </div>
        {offerType ? null : <NoRecord />}
        {offerType === 'Hotel' ? <HotelResult /> : null}
      </div>
    );
  }
}
