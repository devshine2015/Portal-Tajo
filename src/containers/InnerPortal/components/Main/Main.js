import React from 'react';
import PropTypes from 'prop-types';

const makeInnerPortal = () => (Component) => {
  class InnerPortal extends React.Component {

    state = {
      isSidebarOpen: false,
    };

    componentWillReceiveProps(nextProps) {
      if (!this.props.projectIsReady && nextProps.projectIsReady) {
        this.props.fetchSpecificData();
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
      return (
        <Component
          canShowContent={this.canShowContent}
          toggleSidebar={this.toggleSidebar}
          logout={this.onLogout}
          isSidebarOpen={this.state.isSidebarOpen}
          {...this.props}
        />
      );
    }

  }

  InnerPortal.propTypes = {
    projectIsReady: PropTypes.bool.isRequired,
    fetchSpecificData: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  };

  return InnerPortal;
};

export default makeInnerPortal;
