import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import styles from './index.less';
import quan from '@/assets/image/quan.jpg';

// eslint-disable-next-line react/prefer-stateless-function
export default class Card1 extends Component {
  render() {
    return (
      <div className={styles.no}>
        {/* <img src={quan} alt="" width="100%" height="100%" /> */}
        <QRCode value="http://dev.c85eaf0d05d04465a81befded3f4f608b.cn-shenzhen.alicontainer.com/#/rws/CustomerView/110000068" />
      </div>
    );
  }
}
