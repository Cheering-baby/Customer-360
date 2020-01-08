import React, { Component } from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import { isNullOrUndefined } from 'util';
import styles from './index.less';

function generateDays(month) {
  const returnData = [];
  if (isNullOrUndefined(month)) return returnData;
  const arr1 = ['01', '03', '05', '07', '08', '10', '12'];
  const arr2 = ['02', '04', '06', '09', '11'];
  let len = 0;
  arr1.forEach(item => {
    if (month.toString() === item) {
      len = 31;
    }
  });
  arr2.forEach(item => {
    if (month.toString() === item) {
      len = 30;
    }
  });
  if (month.toString() === '02') {
    len = 29;
  }
  for (let i = 1; i <= len; i += 1) {
    if (i < 10) {
      returnData.push('0' + i);
    } else {
      returnData.push(i.toString());
    }
  }
  return returnData;
}

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOperation: false,
      start: undefined,
      end: undefined,
    };
  }

  componentDidMount() {
    moment.locale('en');
    window.addEventListener('click', this.hideShowOperation);
    const { startDate, endDate } = this.props;
    this.setState({
      start: startDate,
      end: endDate,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate } = this.props;
    if (startDate !== nextProps.startDate) {
      this.setState({
        start: nextProps.startDate,
      });
    }
    if (endDate !== nextProps.endDate) {
      this.setState({
        end: nextProps.endDate,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.hideShowOperation);
  }

  // eslint-disable-next-line consistent-return
  changeShowOperaton = e => {
    // e.nativeEvent.stopImmediatePropagation();
    const { showOperation } = this.state;
    const { startDate, endDate } = this.props;
    if (showOperation) return false;
    let startMonth;
    let inputStart;
    let inputEnd;
    if (isNullOrUndefined(startDate)) {
      startMonth = moment().format('MM');
    } else {
      startMonth = moment(startDate, 'MM-DD').format('MM');
      inputStart = moment(startDate, 'MM-DD').format('MMDD');
    }
    let endMonth;
    if (isNullOrUndefined(endDate)) {
      endMonth = moment().format('MM');
    } else {
      endMonth = moment(endDate, 'MM-DD').format('MM');
      inputEnd = moment(endDate, 'MM-DD').format('MMDD');
    }
    this.setState(
      {
        showOperation: !showOperation,
        startMonth,
        endMonth,
        inputStart,
        inputEnd,
      },
      () => {
        setTimeout(() => {
          this.changeScrollTop();
        }, 100);
      },
    );
  };

  hideShowOperation = () => {
    const { start, end, showOperation, out } = this.state;
    const { onChange } = this.props;
    if (!showOperation || !out) return false;
    if (start && end) {
      onChange(start, end);
    } else {
      this.setState({
        start: undefined,
        end: undefined,
        startMonth: undefined,
        endMonth: undefined,
      });
    }
    this.setState({
      showOperation: false,
    });
  };

  clear = e => {
    // e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    const { onChange } = this.props;
    onChange();
  };

  subMonth = (type, month) => {
    const result = Number(month) - 1;
    const nextMonth = result < 10 ? `0${result}` : result.toString();
    if (type === 'start') {
      this.setState({
        startMonth: nextMonth,
      });
    }
    if (type === 'end') {
      this.setState({
        endMonth: nextMonth,
      });
    }
  };

  addMonth = (type, month) => {
    const result = Number(month) + 1;
    const nextMonth = result < 10 ? `0${result}` : result.toString();
    if (type === 'start') {
      this.setState({
        startMonth: nextMonth,
      });
    }
    if (type === 'end') {
      this.setState({
        endMonth: nextMonth,
      });
    }
  };

  addEndMonth = () => {
    const { endMonth } = this.state;
    const result = Number(endMonth) + 1;
    const nextMonth = result < 10 ? `0${result}` : result.toString();
    this.setState({
      endMonth: nextMonth,
    });
  };

  changeDate = (type, day) => {
    if (type === 'start') {
      if (this.disableStart(day)) return false;
      const { startMonth } = this.state;
      const date = `${startMonth.toString()}-${day}`;
      const inputStart = moment(date, 'MM-DD').format('MMDD');
      this.setState({
        start: date,
        inputStart,
      });
    }

    if (type === 'end') {
      if (this.disableEnd(day)) return false;
      const { endMonth } = this.state;
      const date = `${endMonth.toString()}-${day}`;
      const inputEnd = moment(date, 'MM-DD').format('MMDD');
      this.setState({
        end: date,
        inputEnd,
      });
    }
  };

  disableEnd = item => {
    const { start, endMonth } = this.state;
    if (start && endMonth) {
      const date = `${endMonth}-${item}`;
      if (moment(start, 'MM-DD') >= moment(date, 'MM-DD')) {
        return true;
      }
    }
    return false;
  };

  disableStart = item => {
    const { end, startMonth } = this.state;
    if (end && startMonth) {
      const date = `${startMonth}-${item}`;
      if (moment(end, 'MM-DD') <= moment(date, 'MM-DD')) {
        return true;
      }
    }
    return false;
  };

  changeWindowState = type => {
    if (type === 'over') {
      this.setState({
        out: false,
      });
    }
    if (type === 'out') {
      this.setState({
        out: true,
      });
    }
  };

  changeInputStart = e => {
    const { end } = this.state;
    const { value } = e.target;
    this.setState({
      inputStart: value,
    });
    const date = moment(value, 'MMDD').format('MM-DD');
    if (date && date !== 'Invalid date') {
      if (end && moment(value, 'MMDD') > moment(end, 'MM-DD')) return false;
      const startMonth = moment(value, 'MMDD').format('MM');
      const start = moment(value, 'MMDD').format('MM-DD');
      this.setState(
        {
          startMonth,
          start,
        },
        () => {
          this.changeScrollTop();
        },
      );
    }
  };

  changeInputEnd = e => {
    const { start } = this.state;
    const { value } = e.target;
    this.setState({
      inputEnd: value,
    });
    const date = moment(value, 'MMDD').format('MM-DD');
    if (date && date !== 'Invalid date') {
      if (start && moment(value, 'MMDD') < moment(start, 'MM-DD')) return false;
      const endMonth = moment(value, 'MMDD').format('MM');
      const end = moment(value, 'MMDD').format('MM-DD');
      this.setState(
        {
          endMonth,
          end,
        },
        () => {
          this.changeScrollTop();
        },
      );
    }
  };

  changeScrollTop() {
    const MonthDaySelectStart = document.getElementsByName('MonthDaySelectStart')[0];
    const MonthDaySelectEnd = document.getElementsByName('MonthDaySelectEnd')[0];
    const { startMonth, start, end, endMonth } = this.state;
    const arr1 = ['01', '03', '05', '07', '08', '10', '12'];
    const arr2 = ['02', '04', '06', '09', '11'];
    if (!isNullOrUndefined(MonthDaySelectStart) && start) {
      const day = moment(start, 'MM-DD').format('DD');
      let len;
      if (arr1.indexOf(startMonth) > -1) {
        len = 31;
      } else if (arr2.indexOf(startMonth) > -1) {
        len = 30;
      } else if (startMonth === '02') {
        len = 29;
      }
      let gap = Number(day) - 1;
      const maxGap = len - 11;
      if (gap > 0) {
        if (gap > maxGap) {
          gap = maxGap;
        }
        MonthDaySelectStart.scrollTop = gap * 24;
      }
    }

    if (!isNullOrUndefined(MonthDaySelectEnd) && end) {
      const day = moment(end, 'MM-DD').format('DD');
      let len;
      if (arr1.indexOf(endMonth) > -1) {
        len = 31;
      } else if (arr2.indexOf(endMonth) > -1) {
        len = 30;
      } else if (endMonth === '02') {
        len = 29;
      }
      let gap = Number(day) - 1;
      const maxGap = len - 11;
      if (gap > 0) {
        if (gap > maxGap) {
          gap = maxGap;
        }
        MonthDaySelectEnd.scrollTop = gap * 24;
      }
    }
  }

  render() {
    const { startDate, endDate } = this.props;
    const { showOperation, startMonth, endMonth, start, end, inputStart, inputEnd } = this.state;
    const startDays = generateDays(startMonth);
    const endDays = generateDays(endMonth);
    return (
      <div className={styles.container}>
        <span
          className={styles.show}
          onClick={this.changeShowOperaton}
          onMouseEnter={() => this.changeWindowState('over')}
          onMouseLeave={() => this.changeWindowState('out')}
        >
          <input
            placeholder="Start Date"
            value={startDate ? moment(startDate, 'MM-DD').format('MMM-DD') : ''}
            className={styles.dateShow}
            readOnly="readonly"
            unselectable="on"
          />
          <span className={styles.separator}>~</span>
          <input
            placeholder="End Date"
            value={endDate ? moment(endDate, 'MM-DD').format('MMM-DD') : ''}
            className={styles.dateShow}
            readOnly="readonly"
            unselectable="on"
          />
          {startDate && endDate ? (
            <Icon type="close" className={styles.anticonClear} onClick={this.clear} />
          ) : (
            <Icon type="calendar" className={styles.anticonCalendar} />
          )}
        </span>
        {showOperation ? (
          <div
            className={styles.operation}
            onClick={e => {
              e.nativeEvent.stopImmediatePropagation();
              if (showOperation) return false;
              this.setState({ showOperation: true });
            }}
          >
            <div className={styles.datePanel}>
              <div className={styles.left}>
                <div className={styles.inputWrap}>
                  <input
                    placeholder="Start Date"
                    value={inputStart || ''}
                    className={styles.input}
                    onChange={this.changeInputStart}
                  />
                </div>
                <div className={styles.body}>
                  <div className={styles.month}>
                    {startMonth !== '01' ? (
                      <Icon
                        type="left"
                        className={styles.icon}
                        onClick={() => {
                          this.subMonth('start', startMonth);
                        }}
                      />
                    ) : (
                      <div className={styles.empty} />
                    )}
                    <span className={styles.text}>{startMonth}</span>
                    {startMonth !== '12' && startMonth < endMonth ? (
                      <Icon
                        type="right"
                        className={styles.icon}
                        onClick={() => {
                          this.addMonth('start', startMonth);
                        }}
                      />
                    ) : (
                      <div className={styles.empty} />
                    )}
                  </div>
                  <div className={styles.daySelect} name="MonthDaySelectStart">
                    <ul>
                      {startDays.map(item => {
                        return (
                          <li
                            key={item}
                            onClick={() => this.changeDate('start', item)}
                            className={`${
                              moment(start, 'MM-DD').format('MM') === startMonth &&
                              moment(start, 'MM-DD').format('DD') === item
                                ? styles.light
                                : null
                            } ${this.disableStart(item) ? styles.disable : null}`}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.middle}>~</div>
              <div className={styles.right}>
                <div className={styles.inputWrap}>
                  <input
                    placeholder="End Date"
                    value={inputEnd || ''}
                    className={styles.input}
                    onChange={this.changeInputEnd}
                  />
                </div>
                <div className={styles.body} style={{ border: '0' }}>
                  <div className={styles.month}>
                    {endMonth !== '01' && endMonth > startMonth ? (
                      <Icon
                        type="left"
                        className={styles.icon}
                        onClick={() => {
                          this.subMonth('end', endMonth);
                        }}
                      />
                    ) : (
                      <div className={styles.empty} />
                    )}
                    <span className={styles.text}>{endMonth}</span>
                    {endMonth !== '12' ? (
                      <Icon type="right" className={styles.icon} onClick={this.addEndMonth} />
                    ) : (
                      <div className={styles.empty} />
                    )}
                  </div>
                  <div className={styles.daySelect} name="MonthDaySelectEnd">
                    <ul>
                      {endDays.map(item => {
                        return (
                          <li
                            key={item}
                            onClick={() => this.changeDate('end', item)}
                            className={`${
                              moment(end, 'MM-DD').format('MM') === endMonth &&
                              moment(end, 'MM-DD').format('DD') === item
                                ? styles.light
                                : null
                            } ${this.disableEnd(item) ? styles.disable : null}`}
                          >
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
