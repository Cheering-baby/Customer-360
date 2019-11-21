import React, { Component } from 'react';
import NavTitle from '@/components/NavTitle';

// eslint-disable-next-line react/prefer-stateless-function
export default class Index extends Component {
  render() {
    const title = [
      {
        name: 'E-Service',
      },
      {
        name: 'Call Center',
      },
      {
        name: 'Booking',
        fontWeight: true,
        clickEvent: () => {
          console.log('123');
        },
      },
    ];
    return (
      <div>
        <NavTitle title={title} />
      </div>
    );
  }
}
