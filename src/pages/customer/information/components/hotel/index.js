import React, { Component } from 'react';
import { Tabs } from 'antd';
import Log from './log'
import styles from './index.less';

const { TabPane } = Tabs;

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  renderIcon = key => {
    if (key === 1) {
      return (
        <div>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconclock"></use>
          </svg>
          <span style={{ marginLeft: '5px' }}>CURRENT TRANSACTIONS</span>
        </div>
      );
    }
    if (key === 2) {
      return (
        <div>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconTicket"></use>
          </svg>
          <span style={{ marginLeft: '5px' }}>VOUCHERS</span>
        </div>
      );
    }
    if (key === 3) {
      return (
        <div>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconhotel"></use>
          </svg>
          <span style={{ marginLeft: '5px' }}>HOTEL BOOKINGS</span>
        </div>
      );
    }
    if (key === 4) {
      return (
        <div>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconlog"></use>
          </svg>
          <span style={{ marginLeft: '5px' }}>HOTEL AUDIT LOG</span>
        </div>
      );
    }
  };

  render() {
    const { customerId } = this.props;
    return (
      <div className={styles.container}>
        <Tabs defaultActiveKey="4">
          <TabPane tab={this.renderIcon(1)} key="1">
            CURRENT TRANSACTIONS
          </TabPane>
          <TabPane tab={this.renderIcon(2)} key="2">
            VOUCHERS
          </TabPane>
          <TabPane tab={this.renderIcon(3)} key="3">
            HOTEL BOOKINGS
          </TabPane>
          <TabPane tab={this.renderIcon(4)} key="4">
            <Log customerId={customerId} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
