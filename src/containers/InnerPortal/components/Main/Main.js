import React from 'react';
import PropTypes from 'prop-types';

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

  canShowContent() {
    return this.props.projectIsReady;
  }

  onLogout = () => {
    this.props.auth.logout();
  }

}

InnerPortal.propTypes = {
  projectIsReady: PropTypes.bool.isRequired,
  fetchSpecificData: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    logout: PropTypes.func.isRequired,
  }).isRequired,
};

export default InnerPortal;
