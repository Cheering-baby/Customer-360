import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Tooltip } from 'antd';
import { thousands } from '@/utils/utils';
import styles from './index.less';
import Hai from '@/assets/image/hai.jpg';

@connect(({ customerCardInfo, loading }) => ({
  customerCardInfo,
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
    const {
      getCustomerCardDetailLoading,
      customerCardInfo: { grInfo = {} },
    } = this.props;
    const { gdBal, gdExpirAmtCurMonth, gdExpirAmtNextMonth, grMembClass, gpBal } = grInfo;
    const { hideIconState } = this.state;
    const bgColor = 'rgb(206, 65, 71)';
    return (
      <Spin spinning={getCustomerCardDetailLoading}>
        <div className={styles.contianer} style={{ backgroundColor: bgColor }}>
          <div className={styles.title}>
            <div>30030006858</div>
            <div>K60S</div>
          </div>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.item1} style={{ borderRight: '1px solid #fff' }}>
                <div className={styles.num}>{thousands(gdExpirAmtCurMonth)}</div>
                <div className={styles.gd}>GD</div>
              </div>
              <div className={styles.item2}>
                <div className={styles.num}>{thousands(gpBal)}</div>
                <div className={styles.gd}>GP</div>
              </div>
            </div>
            <div>
              <img src={Hai} alt="" width="50" height="90" />
            </div>
          </div>
          <div className={styles.footer}>
            <div>{grMembClass}</div>
            <div className={styles.icon}>
              <Tooltip title="Member Monetary">
                <svg
                  className="icon"
                  aria-hidden="true"
                  style={{ marginRight: '5px', cursor: 'pointer', userSelect: 'none' }}
                >
                  <use xlinkHref="#iconmeiyuan9"></use>
                </svg>
              </Tooltip>
              <span id="conditionIcon" onClick={this.changeIconState}>
                <svg
                  className="icon"
                  aria-hidden="true"
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  ref={this.gdIconRef}
                >
                  <use xlinkHref="#iconxiala-yuan"></use>
                </svg>
              </span>
            </div>
          </div>
          {hideIconState ? null : (
            <div className={styles.gdContent} style={{ backgroundColor: bgColor }}>
              <div className={styles.item}>
                <div>GD Expiry (Current Month)</div>
                <div>{gdExpirAmtCurMonth ? thousands(gdExpirAmtCurMonth) : '-'}</div>
              </div>
              <div className={styles.item}>
                <div>GD Expiry (Next Month)</div>
                <div>{gdExpirAmtNextMonth ? thousands(gdExpirAmtNextMonth) : '-'}</div>
              </div>
              <div className={styles.item}>
                <div>Rebates GD Forecast</div>
                <div>{gdBal ? thousands(gdBal) : '-'}</div>
              </div>
            </div>
          )}
        </div>
      </Spin>
    );
  }
}
