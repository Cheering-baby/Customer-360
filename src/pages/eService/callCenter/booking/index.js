import React, { Component } from 'react';
import { Col, Row } from 'antd';
import Title from './components/Title';
import Search from './components/Search';
import SearchResult from './components/SearchResult';
import styles from './index.less'; // eslint-disable-next-line react/prefer-stateless-function
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  render() {
    return (
      <div>
        {/* <div className={styles.title}>
          <Title />
        </div>
        <div className={styles.content}>
          <Row>
            <Col sm={24} lg={6}>
              <Search />
            </Col>
            <Col sm={24} lg={18} className={styles.result}>
              <SearchResult />
            </Col>
          </Row>
        </div> */}
        <BraftEditor
          className="my-editor"
          placeholder="Please Enter"
          language="en"
          // controls={controls}
        />
      </div>
    );
  }
}
