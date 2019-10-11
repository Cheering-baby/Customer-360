import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Breadcrumb, Row, Col } from 'antd';
import { getQueryVariable } from '@/utils/utils';
import styles from './index.less';
import CustomerInfo from './components/customerInfo';
import Card from './components/cardCustomerInfo';
import Vouchers from './components/vouchers';
// eslint-disable-next-line react/prefer-stateless-function
@connect(({ customerInfo }) => ({
  customerInfo,
}))
export default class Index extends Component {
  render() {
    const {
      customerInfo: { customerInfoDetail = {} },
    } = this.props;
    const { customerName } = customerInfoDetail;
    const customerId = Number(getQueryVariable('customerId'));
    return (
      <div>
        <div className={styles.title}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/customer">Customer 360</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{customerName}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row className={styles.content}>
          <Col span={6}>
            <CustomerInfo customerId={customerId} />
          </Col>
          <Col span={18} style={{ paddingLeft: '14px' }}>
            <Card customerId={customerId} />
            <Row style={{ marginBottom: '14px' }}>
              <Col span={24}>
                <Vouchers customerId={customerId} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
