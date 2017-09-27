import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/animated';
import Placeholder from './components/Placeholder';
import PageHeader from './components/PageHeader';

const DealerPage = ({
  children,
  fleetReadyState,
  title,
}) => {
  switch (fleetReadyState) {
    case 'not ready':
      return <Placeholder />;

    case 'error':
      return <div>error happened</div>;

    case 'loading':
      return <Loader.FullscreenLogo />;

    case 'ready':
    default:
      return (
        <div
          style={{
            height: '100%',
            backgroundColor: '#fafafa',
          }}
        >
          { title && <PageHeader text={title} /> }
          {children}
        </div>
      );
  }
};

DealerPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  fleetReadyState: PropTypes.oneOf(['ready', 'not ready', 'loading', 'error']).isRequired,
};

DealerPage.defaultProps = {
  title: undefined,
};

export default DealerPage;
