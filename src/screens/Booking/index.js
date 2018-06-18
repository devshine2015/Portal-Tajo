import React from 'react';
import Layout from 'components/Layout';

const Booking = () => {
  return (
    <Layout.Content noPadding maxWidth={'inherit'} style={{ height: '100%' }} >
      <iframe
        title="booking"
        src={'https://trucks-booking-liqujhptko.now.sh'}
        style={{
          height: '100%',
          width: '100%',
          border: 'none',
        }}
      />
    </Layout.Content>);
};

export default Booking;
