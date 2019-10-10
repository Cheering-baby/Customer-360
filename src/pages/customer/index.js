import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Input, Table } from 'antd';
import styles from './index.less';

const { Search } = Input;
@connect(({ searchCustomer, loading }) => ({
  searchCustomer,
  getCustomerListLoading: loading.effects['searchCustomer/getCustomerList'],
}))
export default class Index extends Component {
  toDetail = (record = {}) => {
    const { customerId } = record;
    router.push({
      pathname: '/customer/information',
      query: {
        customerId,
      },
    });
  };

  changeSearchInput = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'searchCustomer/save',
      payload: {
        searchInput: e.target.value,
      },
    });
  };

  getCustomerList = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'searchCustomer/getCustomerList',
      payload: {
        currentPage: 1,
        pageSize: 20,
        custArgInfo: [
          {
            value,
          },
        ],
      },
    });
  };

  render() {
    const {
      searchCustomer: { searchInput, customerInfo = [] },
      getCustomerListLoading,
    } = this.props;
    const columns = [
      {
        title: 'Member No.',
        dataIndex: 'grMemberNo',
        key: 'grMemberNo',
        render: (text, record) => {
          const str = record.grMemberNo || record.rcsMemberNo;
          return str;
        },
      },
      {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
      },
      {
        title: 'Member Class',
        dataIndex: 'grMemberClass',
        key: 'grMemberClass',
        render: (text, record) => {
          const str = record.grMemberClass || record.rcsMemberClass;
          return str;
        },
      },
      {
        title: 'Status',
        dataIndex: 'grMemberStatus',
        key: 'grMemberStatus',
        render: (text, record) => {
          const str = record.grMemberStatus || record.rcsMemberStatus;
          return str;
        },
      },
      {
        title: 'Date of Birth',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: 'Document No.',
        dataIndex: 'passportNo',
        key: 'passportNo',
        render: (text, record) => {
          const str = record.passportNo || record.fin || record.nric;
          return str;
        },
      },
      {
        title: 'Contact No.',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Nationality',
        dataIndex: 'nationality',
        key: 'nationality',
      },
    ];
    return (
      <div className={styles.container}>
        <div className={styles.searchTitle}>Search Customer</div>
        <div className={styles.search}>
          <Search
            placeholder="Please Enter"
            style={{ width: '600px' }}
            value={searchInput}
            size="large"
            onSearch={this.getCustomerList}
            onChange={this.changeSearchInput}
            enterButton
          />
          <div className={styles.tableAbsolute}>
            <Table
              columns={columns}
              dataSource={customerInfo}
              pagination={false}
              loading={getCustomerListLoading}
              // scroll={{ y: 360 }}
              onRow={record => ({
                  onClick: event => {
                    this.toDetail(record, event);
                  },
                })}
            ></Table>
          </div>
        </div>
      </div>
    );
  }
}
