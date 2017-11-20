import React from 'react';
import PropTypes from 'prop-types';
import { isDealer } from 'configs';
import Layout from 'components/Layout';
import DealerPage from './ConnectedDealerPage';


const DealerOrCustomerScreen = ({
  children,
}) => {
  if (isDealer) {
    return (
      <DealerPage>
        {children}
      </DealerPage>);
  }
  return (
    <Layout.Content>
      {children}
    </Layout.Content>
  );
};

DealerOrCustomerScreen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DealerOrCustomerScreen;
