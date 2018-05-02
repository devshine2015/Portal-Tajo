import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { isDemo } from 'configs';
import { css } from 'aphrodite/no-important';
import AnimatedLogo from 'components/animated';
import SnackbarNotification from 'containers/Snackbar';
import ProfileChecker from '../ProfileChecker';
import classes from './classes';

const makeInnerPortal = () => (Component) => {
  class InnerPortal extends React.Component {
    state = {
      isSidebarOpen: false,
    };

    componentWillReceiveProps(nextProps) {
      if (!this.props.readyToShowPortal && nextProps.readyToShowPortal) {
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
      return this.props.readyToShowPortal;
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

            <div className={cs(css(classes.innerPortal), {
              [css(classes.innerPortalWithoutPaddind)]: isDemo
            })}
            >
              {children}
            </div>

            <SnackbarNotification />

            <ProfileChecker />
          </Component>
        );
      }

      return <AnimatedLogo.FullscreenLogo />;
    }
  }

  InnerPortal.propTypes = {
    children: PropTypes.element.isRequired,
    readyToShowPortal: PropTypes.bool,
    fetchSpecificData: PropTypes.func,
    auth: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  };

  InnerPortal.defaultProps = {
    fetchSpecificData: undefined,
    readyToShowPortal: false,
  };

  return InnerPortal;
};

export default makeInnerPortal;
