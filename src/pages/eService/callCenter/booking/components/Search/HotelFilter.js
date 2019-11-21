import React, { Component } from 'react';
import styles from './index.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class HotelFilter extends Component {
  render() {
    return (
      <div className={styles.hotelFilterContainer}>
        <div className={styles.hotel}>
          <div className={styles.label}>Hotel</div>
        </div>
        <div className={styles.checkIn}>
          <div className={styles.label}>Check In Date</div>
        </div>
        <div className={styles.checkOut}>
          <div className={styles.label}>Check out Date</div>
        </div>
        <div className={styles.roomCategory}>
          <div className={styles.label}>Room Category</div>
        </div>
        <div className={styles.priceRange}>
          <div className={styles.label}>Price</div>
        </div>
        <div className={styles.searchOptions}>
          <div className={styles.label}>Search Options</div>
        </div>
      </div>
    );
  }
}
