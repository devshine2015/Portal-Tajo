import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import AnimatedLogo from 'components/animated';
import SnackbarNotification from 'containers/Snackbar';
import classes from './classes';

const makeInnerPortal = () => (Component) => {
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
      return this.props.projectIsReady;
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

            <div className={css(classes.innerPortal)}>
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
    projectIsReady: PropTypes.bool,
    fetchSpecificData: PropTypes.func,
    auth: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerPortal.defaultProps = {
    fetchSpecificData: undefined,
    projectIsReady: false,
  };

  return InnerPortal;
};

export default makeInnerPortal;
