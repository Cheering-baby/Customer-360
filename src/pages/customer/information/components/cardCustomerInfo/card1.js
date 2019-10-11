import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from './index.less';
import Hai from '@/assets/image/hai.jpg';

@connect(({ loading }) => ({
  getCustomerCardDetailLoading: loading.effects['customerCardInfo/getCustomerCardDetail'],
}))
// eslint-disable-next-line react/prefer-stateless-function
export default class Card1 extends Component {
  constructor(props) {
    super(props);
    this.gdIconRef = React.createRef();
    this.state = {
      hideIconState: true,
    };
  }

  changeIconState = () => {
    const { hideIconState } = this.state;
    const conditionIcon = document.getElementById('conditionIcon');
    if (hideIconState) {
      conditionIcon.className = `${styles.rotateIconFocus}`;
      //   console.log(this.gdIconRef);
      this.setState({
        hideIconState: false,
      });
    } else {
      conditionIcon.className = `${styles.rotateIconBlur}`;
      this.setState({
        hideIconState: true,
      });
    }
  };

  render() {
    const { getCustomerCardDetailLoading } = this.props;

    return (
      <Spin spinning={getCustomerCardDetailLoading}>
        <div className={styles.contianer} style={{ backgroundColor: 'rgb(206, 65, 71)' }}>
          <div className={styles.title}>
            <div>30030006858</div>
            <div>K60S</div>
          </div>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.item1}>
                <div className={styles.num}>0.00</div>
                <div className={styles.gd}>GD</div>
              </div>
              <div className={styles.item2}>
                <div className={styles.num}>9.00</div>
                <div className={styles.gd}>GD</div>
              </div>
            </div>
            <div>
              <img src={Hai} alt="" width="50" height="90" />
            </div>
          </div>
          <div className={styles.footer}>
            <div>CLASSIC</div>
            <div className={styles.icon}>
              <svg
                className="icon"
                aria-hidden="true"
                style={{ marginRight: '5px', cursor: 'pointer' }}
              >
                <use xlinkHref="#iconmeiyuan9"></use>
              </svg>
              <span id="conditionIcon" onClick={this.changeIconState}>
                <svg
                  className="icon"
                  aria-hidden="true"
                  style={{ cursor: 'pointer' }}
                  ref={this.gdIconRef}
                >
                  <use xlinkHref="#iconxiala-yuan"></use>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
