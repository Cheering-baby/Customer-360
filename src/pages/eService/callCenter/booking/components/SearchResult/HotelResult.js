import React, { Component } from 'react';
import CalendarShow from '@/components/Calendar';
import { Icon, Tabs, Table, Tooltip, Button } from 'antd';
import data from './data';
import styles from './index.less';

const dataSource = [
  {
    hotelName: 'Festive Hotel',
    roomCategory: 'DELUEX',
    rate: '620',
  },
];
const { TabPane } = Tabs;
export default class Calendar extends Component {
  columns = [
    {
      title: 'Hotel Name',
      dataIndex: 'hotelName',
      width: '20%',
    },
    {
      title: 'Room Category',
      dataIndex: 'roomCategory',
      width: '20%',
    },
    {
      title: 'Rate From',
      dataIndex: 'rate',
      width: '20%',
    },
    {
      title: 'Details',
      width: '40%',
      render: () => (
        <div className={styles.tableOperation}>
          <Tooltip title="Detail">
            <Icon type="eye" style={{ cursor: 'pointer' }} />
          </Tooltip>
          <Button type="primary">Add to Cart</Button>
        </div>
      ),
    },
  ];

  clickEvent = date => {
    console.log(date.format('YYYY-MM-DD'));
  };

  render() {
    const {
      result: { hotelInfos },
    } = data;
    return (
      <div>
        <div className={styles.calendarContainer}>
          <CalendarShow
            clickEvent={this.clickEvent}
            data={hotelInfos}
            checkInDate="2019-11-23"
            checkOutDate="2019-12-25"
            month="2019-11"
          />
          <div className={styles.changeDate}>
            <div className={styles.change}>
              <Icon
                type="left"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.changeMonth('left');
                }}
              />
              <div className={styles.text}>2019-11</div>
              <Icon
                type="right"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.changeMonth('right');
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.tabContainer}>
          <Tabs>
            <TabPane tab="Tab 1" key="1">
              <Table
                className={`tabs-no-padding ${styles.searchTitle}`}
                columns={this.columns}
                dataSource={dataSource}
                pagination={false}
                rowKey={record => record.id}
                size="small"
              />
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
