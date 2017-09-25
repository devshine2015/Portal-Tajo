import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout';

const DealerPage = ({
  children,
  fleetReadyState,
}) => {
  switch (fleetReadyState) {
    case 'not ready':
      return <Layout.Placeholder />;

    case 'error':
      return <div>error happened</div>;

    case 'ready':
    default:
      return children;
  }
};

DealerPage.propTypes = {
  children: PropTypes.node.isRequired,
  fleetReadyState: PropTypes.oneOf(['ready', 'not ready', 'loading', 'error']).isRequired,
};

export default DealerPage;
