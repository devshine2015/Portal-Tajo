import React from 'react';
import pure from 'recompose/pure';
// import DealerPage from 'containers/DealerPage';
import Layout from 'components/Layout';
import FleetForm from './../FleetForm';

const Page = () => (
  <Layout.Content>
    <FleetForm />
  </Layout.Content>
);


export default pure(Page);

