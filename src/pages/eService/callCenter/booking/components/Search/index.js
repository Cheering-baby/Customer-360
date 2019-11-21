import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import AttractionFilter from './AttractionFilter';
import HotelFilter from './HotelFilter';
import styles from './index.less';

const { Option } = Select;
@connect(({ eServiceBooking }) => ({ offerType: eServiceBooking.offerType }))
// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  changeOfferType = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'eServiceBooking/save',
      payload: {
        offerType: value,
      },
    });
  };

  render() {
    const { offerType } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.offerType}>
          <div className={styles.offerTypeText}>Offer Type</div>
          <div className={styles.offerTypeSelect}>
            <Select
              style={{ width: '100%' }}
              placeholder="Please Select"
              value={offerType}
              onChange={this.changeOfferType}
            >
              <Option value="Hotel">Hotel</Option>
              <Option value="Attraction">Attraction</Option>
            </Select>
          </div>
        </div>
        <div className={styles.filter}>
          <div className={styles.text}>CUSTOM FILTER</div>
          {offerType === 'Hotel' ? <HotelFilter /> : null}
          {offerType === 'Attraction' ? <AttractionFilter /> : null}
        </div>
      </div>
    );
  }
}
