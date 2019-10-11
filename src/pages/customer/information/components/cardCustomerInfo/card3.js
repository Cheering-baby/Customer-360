import React, { Component } from 'react';
import styles from './index.less';
import quan from '@/assets/image/quan.jpg';

// eslint-disable-next-line react/prefer-stateless-function
export default class Card1 extends Component {
  render() {
    return (
      <div className={styles.no}>
        <img src={quan} alt="" width="100%" height="100%" />
      </div>
    );
  }
}
