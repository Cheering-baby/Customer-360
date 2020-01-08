import React, { Component } from 'react';
import { Form, Radio, Checkbox, Button } from 'antd';
import DatePicker from '@/components/DatePicker';
import styles from './index.less';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const formItemLayout = {
  colon: false,
};
@Form.create()
// eslint-disable-next-line react/prefer-stateless-function
export default class AttractionFilter extends Component {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div className={styles.attractionFilterContainer}>
        <Form>
          <FormItem {...formItemLayout} label="Theme Park">
            {getFieldDecorator('themPark', {
              validateTrigger: '',
              rules: [
                {
                  required: true,
                  message: 'Required',
                },
              ],
            })(
              <RadioGroup style={{ marginTop: '-10px' }}>
                <Radio className={styles.radioStyle} value={1} style={{ color: '#565656' }}>
                  Theme park without session
                </Radio>
                <Checkbox style={{ color: '#3B414A', margin: '-10px 0 -5px 23px' }}>All</Checkbox>
                <CheckboxGroup
                  options={plainOptions}
                  style={{ display: 'block', marginLeft: '23px' }}
                />
                <Radio className={styles.radioStyle} value={2} style={{ color: '#565656' }}>
                  Theme park with session
                </Radio>
                <Checkbox style={{ margin: '-10px 0 -5px 23px', color: '#3B414A' }}>
                  Dolphin Island
                </Checkbox>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Check Out Date">
            {getFieldDecorator('visitDate', {
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
                <Radio className={styles.radioStyle} value="Attraction">
                  Attraction
                </Radio>
                <Radio className={styles.radioStyle} value="Attraction Package">
                  Attraction Package
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
