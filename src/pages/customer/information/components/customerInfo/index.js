import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress, Tooltip, Spin } from 'antd';
import { abbreviateName } from '@/utils/utils';
import styles from './index.less';

@connect(({ customerInfo, loading }) => ({
  customerInfo,
  getCustomerDetailLoading: loading.effects['customerInfo/getCustomerDetail'],
}))
// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  componentDidMount() {
    const { dispatch, customerId } = this.props;
    dispatch({
      type: 'customerInfo/getCustomerDetail',
      payload: {
        customerId,
      },
    });
  }

  render() {
    const {
      customerInfo: { customerInfoDetail = {} },
      getCustomerDetailLoading,
    } = this.props;
    const {
      customerName,
      chineseName,
      gender,
      residentialStatus,
      nationality,
      birthday,
      langPreferences,
      passport,
      fin,
      nric,
      drivingLicence,
      otherDocuments,
      contacts = [{}],
      rmCode,
    } = customerInfoDetail;
    const tel = contacts[0].tel ? contacts[0].tel[0].contactInfo : '-';
    const email = contacts[0].email ? contacts[0].email[0].contactInfo : '-';
    return (
      <Spin spinning={getCustomerDetailLoading}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.favorite}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconxingxing"></use>
              </svg>
            </div>
            <div className={styles.more}>...</div>
          </div>
          <div className={styles.photoContainer}>
            <div className={styles.photo}>{abbreviateName(customerName)}</div>
          </div>
          <Row style={{ margin: '10px 0' }}>
            <Col span={6} className={styles.progressContainer}>
              <div className={styles.progess}>
                <div style={{ color: '#ff4a38' }}>10%</div>
                <Progress percent={10} showInfo={false} strokeColor="#ff4a38" />
                <div className={styles.text}>TG-Rolling</div>
              </div>
            </Col>
            <Col span={6} className={styles.progressContainer}>
              <div className={styles.progess}>
                <div style={{ color: '#36d4df' }}>20%</div>
                <Progress percent={20} showInfo={false} strokeColor="#36d4df" />
                <div className={styles.text}>TG-Non-Rolling</div>
              </div>
            </Col>
            <Col span={6} className={styles.progressContainer}>
              <div className={styles.progess}>
                <div style={{ color: '#22b400' }}>30%</div>
                <Progress percent={30} showInfo={false} strokeColor="#22b400" />
                <div className={styles.text}>ETG</div>
              </div>
            </Col>
            <Col span={6} className={styles.progressContainer}>
              <div className={styles.progess}>
                <div style={{ color: '#de9d26' }}>50%</div>
                <Progress percent={50} showInfo={false} strokeColor="#de9d26" />
                <div className={styles.text}>Slot</div>
              </div>
            </Col>
          </Row>
          <div className={styles.nameContianer}>
            <div className={styles.en}>
              <div>{customerName}</div>
              <div className={styles.sex}>
                {gender === 'F' ? (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconxingbienv"></use>
                  </svg>
                ) : (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconxingbienan"></use>
                  </svg>
                )}
              </div>
            </div>
            <div>
              {chineseName}
              {gender === 'F' ? '女士' : '先生'}
            </div>
          </div>
          <div className={styles.basicInfo}>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip title="Date of Birth" placement="top" overlayStyle={{ fontSize: '12px' }}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconshengri"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{birthday || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip
                  title="Preferred Language"
                  placement="top"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconglobal"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{langPreferences || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip
                  title="Identification Document No."
                  placement="top"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconId"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{passport || fin || nric || drivingLicence || otherDocuments || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip
                  title="Residential Status"
                  placement="top"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconplace"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{residentialStatus || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip title="Nationality" placement="top" overlayStyle={{ fontSize: '12px' }}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconflag"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{nationality || '-'}</div>
            </div>
          </div>
          <div className={styles.basicInfo}>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip
                  title="Primary Contact"
                  placement="top"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconphone1"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{tel || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip title="Email" placement="top" overlayStyle={{ fontSize: '12px' }}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconemail1"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{email || '-'}</div>
            </div>
          </div>
          <div className={styles.basicInfo}>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip title="RM Code" placement="top" overlayStyle={{ fontSize: '12px' }}>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icontouxiang"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{rmCode || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip
                  title="Current / Last Gaming Terminal"
                  placement="top"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconplace"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{'-' || '-'}</div>
            </div>
            <div className={styles.basicItem}>
              <div className={styles.icon}>
                <Tooltip
                  title="Current Hotel Stay"
                  placement="top"
                  overlayStyle={{ fontSize: '12px' }}
                >
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconbed"></use>
                  </svg>
                </Tooltip>
              </div>
              <div>{'-' || '-'}</div>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
