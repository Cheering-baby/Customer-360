import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { Breadcrumb, Row, Col } from 'antd';
import styles from './index.less';
import CustomerInfo from './components/customerInfo';
import Card1 from './components/cardCustomerInfo/card1';
import Card2 from './components/cardCustomerInfo/card2';
import Card3 from './components/cardCustomerInfo/card3';
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
            <CustomerInfo />
          </Col>
          <Col span={18} style={{ paddingLeft: '14px' }}>
            <Row style={{ marginBottom: '14px' }}>
              <Col span={8} style={{ paddingRight: '7px' }}>
                <Card1 />
              </Col>
              <Col span={8} style={{ padding: '0 7px' }}>
                <Card2 />
              </Col>
              <Col span={8} style={{ paddingLeft: '7px' }}>
                <Card3 />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Vouchers />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
