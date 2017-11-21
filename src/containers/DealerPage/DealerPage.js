import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/animated';
import Placeholder from './components/Placeholder';

const DealerPage = ({
  children,
  fleetReadyState,
}) => {
  switch (fleetReadyState) {
    case 'not ready':
      return <Placeholder />;

    case 'error':
      return <div>error happened</div>;

    case 'loading':
      return <Loader.FullscreenLogo />;
      // backgroundColor: '#fafafa',
      
    case 'ready':
    default:
      return (
        <div
          style={{
            minHeight: '100%',
            backgroundColor: '#fff',
          }}
        >
          {children}
        </div>
      );
  }
};

DealerPage.propTypes = {
  children: PropTypes.node.isRequired,
  fleetReadyState: PropTypes.oneOf(['ready', 'not ready', 'loading', 'error']).isRequired,
};

export default DealerPage;
