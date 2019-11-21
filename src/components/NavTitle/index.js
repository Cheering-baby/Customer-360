import React, { Component } from 'react';
import styles from './index.less';

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  render() {
    const { title = [] } = this.props;
    const len = title.length;
    return (
      <div className={styles.container}>
        {title.map((item, index) => {
          const { name, fontWeight, clickEvent } = item;
          return (
            <div className={styles.item} key={name}>
              <div
                className={`${fontWeight === true ? styles.fontWeight : null}`}
                onClick={() => {
                  if (clickEvent && typeof clickEvent === 'function') {
                    clickEvent();
                  }
                }}
              >
                {name}
              </div>
              {index !== len - 1 ? <div className={styles.right}>&gt;</div> : null}
            </div>
          );
        })}
      </div>
    );
  }
}
