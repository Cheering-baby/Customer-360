import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Checkbox, Select, Input, Radio, Button } from 'antd';
import DatePicker from '@/components/DatePicker';
import { imgPatch } from '../../../../utils/utils';
import styles from './index.less';

const hotelCodes = ['HM', 'HR', 'FH', 'EH', 'BV', 'CT', 'GHJ'];
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const formItemLayout = {
  colon: false,
};

@Form.create()
@connect(({ eServiceBookingMgr }) => ({ eServiceBookingMgr }))
export default class HotelFilter extends Component {
  search = () => {
    const { form } = this.props;
    form.validateFields(err => {
      if (!err) {
        console.log(123);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.hotelFilterContainer}>
        <Form>
          <FormItem {...formItemLayout} label="Hotel">
            {getFieldDecorator('hotelCode', {
              validateTrigger: '',
              rules: [
                {
                  required: true,
                  message: 'Required',
                },
              ],
            })(
              <div>
                <Checkbox style={{ marginRight: '20px', color: '#3B414A' }}>All</Checkbox>
                <CheckboxGroup>
                  {hotelCodes.map(item => (
                    <Checkbox value={item} key={item} style={{ margin: '0 5px 5px 0' }}>
                      <div className={styles.hotelImgContainer}>
                        <img
                          className={styles.img}
                          src={imgPatch(item)}
                          width={28}
                          height={28}
                          alt=""
                          style={{ padding: item === 'HM' ? '1px' : '0' }}
                        />
                      </div>
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </div>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Check In Date">
            {getFieldDecorator('checkIn', {
              validateTrigger: '',
              rules: [
                {
                  required: true,
                  message: 'Required',
                },
              ],
            })(
              <DatePicker
                item={{
                  allowClear: true,
                  style: { width: '100%' },
                  placeholder: 'Select Date',
                  showToday: false,
                  format: 'DDMMYYYY',
                }}
                formatTime="DD-MM-YYYY"
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Check Out Date">
            {getFieldDecorator('checkOut', {
              validateTrigger: '',
              rules: [
                {
                  required: true,
                  message: 'Required',
                },
              ],
            })(
              <DatePicker
                item={{
                  allowClear: true,
                  style: { width: '100%' },
                  placeholder: 'Select Date',
                  showToday: false,
                  format: 'DDMMYYYY',
                }}
                formatTime="DD-MM-YYYY"
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Room Category">
            <Select placeholder="Select Select">{[]}</Select>
          </FormItem>
          <FormItem {...formItemLayout} label="Price">
            <div className={styles.priceContainer}>
              <Input placeholder="Please Enter" allowClear />
              <span className={styles.gap}>-</span>
              <Input placeholder="Please Enter" allowClear />
            </div>
          </FormItem>
          <FormItem {...formItemLayout} label="Search Options">
            {getFieldDecorator('options', {
              validateTrigger: '',
              rules: [
                {
                  required: true,
                  message: 'Required',
                },
              ],
            })(
              <RadioGroup>
                <Radio className={styles.radioStyle} value="Hotel">
                  Hotel
                </Radio>
                <Radio className={styles.radioStyle} value="Hotel Package">
                  Hotel Package
                </Radio>
              </RadioGroup>,
            )}
          </FormItem>
        </Form>
        <div className={styles.formControl}>
          <Button type="primary" style={{ marginRight: 8, width: '70px' }} onClick={this.search}>
            Search
          </Button>
          <Button style={{ width: '70px' }}>Reset</Button>
        </div>
      </div>
    );
  }
}
