import React, { Component } from 'react';
import Calendar from './Calendar';
import styles from './index.less';

export default class Index extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Calendar />
            </div>
        )
    }
}
