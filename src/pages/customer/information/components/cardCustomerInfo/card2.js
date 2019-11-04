import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { thousands } from '@/utils/utils';
import styles from './index.less';

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
      customerCardInfo: { inviteInfo = {} },
    } = this.props;
    const { hideIconState } = this.state;
    const {
      inviteMembNo,
      inviteBal,
      inviteMembClass,
      inviteExpireAmtCurMonth,
      expdAmtInCurYear,
      expdAmtTillDate,
    } = inviteInfo;
    const bgColor = '#8c7171';
    return (
      <Spin spinning={getCustomerCardDetailLoading}>
        <div className={styles.contianer} style={{ backgroundColor: bgColor }}>
          <div className={styles.title}>
            <div>{inviteMembNo}</div>
          </div>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.item1}>
                <div className={styles.num}>{inviteBal ? thousands(inviteBal) : null}</div>
                <div className={styles.gd}>I$</div>
              </div>
            </div>
            <div></div>
          </div>
          <div className={styles.footer}>
            <div>{inviteMembClass}</div>
            <div className={styles.icon}>
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
                <div>Invites $ Expiry (Current Month)</div>
                <div>{inviteExpireAmtCurMonth ? thousands(inviteExpireAmtCurMonth) : '-'}</div>
              </div>
              <div className={styles.item}>
                <div>Expenditure (Current Year)</div>
                <div>{expdAmtInCurYear ? thousands(expdAmtInCurYear) : '-'}</div>
              </div>
              <div className={styles.item}>
                <div>Expenditure (Till Date)</div>
                <div>{expdAmtTillDate ? thousands(expdAmtTillDate) : '-'}</div>
              </div>
            </div>
          )}
        </div>
      </Spin>
    );
  }
}
