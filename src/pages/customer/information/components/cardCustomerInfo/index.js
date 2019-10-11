import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import Card1 from './card1';
import Card2 from './card2';
import Card3 from './card3';

@connect(({ customerInfo }) => ({
  customerInfo,
}))
// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  componentDidMount() {
    const { dispatch, customerId } = this.props;
    dispatch({
      type: 'customerCardInfo/getCustomerCardDetail',
      payload: {
        customerId,
      },
    });
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}
