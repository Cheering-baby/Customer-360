import React, { Component } from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>VOUCHER BALANCE</div>
        <Row>
          <Col span={6} style={{ borderRight: '1px solid #e8e8e8' }}>
            <div className={styles.item}>
              <div className={styles.img} style={{ backgroundColor: '#644ffb', fontSize: '18px' }}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconhotel-copy"></use>
                </svg>
              </div>
              <div>
                <div className={styles.num}>1</div>
                <div className={styles.text}>Hotel</div>
              </div>
            </div>
          </Col>
          <Col span={6} style={{ borderRight: '1px solid #e8e8e8' }}>
            <div className={styles.item}>
              <div className={styles.img} style={{ backgroundColor: '#d42513', fontSize: '18px' }}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icondaochat"></use>
                </svg>
              </div>
              <div>
                <div className={styles.num}>1</div>
                <div className={styles.text}>F&B</div>
              </div>
            </div>
          </Col>
          <Col span={6} style={{ borderRight: '1px solid #e8e8e8' }}>
            <div className={styles.item}>
              <div className={styles.img} style={{ backgroundColor: '#eb8115', fontSize: '18px' }}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icongift"></use>
                </svg>
              </div>
              <div>
                <div className={styles.num}>1</div>
                <div className={styles.text}>Gift</div>
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div className={styles.item}>
              <div className={styles.img} style={{ backgroundColor: '#199f23', fontSize: '18px' }}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icontickets_fill"></use>
                </svg>
              </div>
              <div>
                <div className={styles.num}>1</div>
                <div className={styles.text}>Others</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
