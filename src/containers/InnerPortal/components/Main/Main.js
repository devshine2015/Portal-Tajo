import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLogo from 'components/animated';
import SnackbarNotification from 'containers/Snackbar';
import styles from './styles.css';

const makeInnerPortal = (config = {}) => (Component) => {
  class InnerPortal extends React.Component {

    state = {
      isSidebarOpen: false,
    };

    componentWillReceiveProps(nextProps) {
      if (!this.props.projectIsReady && nextProps.projectIsReady) {
        if (this.props.fetchSpecificData !== undefined && typeof this.props.fetchSpecificData === 'function') {
          this.props.fetchSpecificData();
        }
      }
    }

    toggleSidebar = () => {
      this.setState({
        isSidebarOpen: !this.state.isSidebarOpen,
      });
    }

    canShowContent = () => {
      return config.isReady || this.props.projectIsReady;
    }

    onLogout = () => {
      this.props.auth.logout();
    }

    render() {
      // hide InnerPortal from unauthenticated users
      if (this.canShowContent()) {
        const { children, ...rest } = this.props;

        return (
          <Component
            canShowContent={this.canShowContent}
            toggleSidebar={this.toggleSidebar}
            logout={this.onLogout}
            isSidebarOpen={this.state.isSidebarOpen}
            {...rest}
          >

            <div className={styles.content}>
              {children}
            </div>

            <SnackbarNotification />
          </Component>
        );
      }

      return <AnimatedLogo.FullscreenLogo />;
    }

  }

  InnerPortal.propTypes = {
    children: PropTypes.element.isRequired,
    projectIsReady: PropTypes.bool.isRequired,
    fetchSpecificData: PropTypes.func,
    auth: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerPortal.defaultProps = {
    fetchSpecificData: undefined,
  };

  return InnerPortal;
};

export default makeInnerPortal;
