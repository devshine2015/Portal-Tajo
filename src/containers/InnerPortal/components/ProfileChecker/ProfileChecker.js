import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { css } from 'aphrodite/no-important';
import Overlay from 'components/User/Overlay';
import PasswordForm from 'containers/User/PasswordFormConnected';
// import classes from './classes';

const STYLES = {
  overlay: {
    zIndex: 3000,
    backgroundColor: 'rgba(255, 255, 255, .9)',
  },
};

class ProfileChecker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: props.isDefaultPassword,
    };
  }

  closeForm = () => {
    this.setState(() => ({
      isOpened: false,
    }));
  }

  render() {
    if (this.state.isOpened) {
      return (
        <Overlay style={STYLES.overlay}>
          <PasswordForm
            closeForm={this.closeForm}
            userId={this.props.userId}
          />
        </Overlay>
      );
    }

    return null;
  }
}

ProfileChecker.propTypes = {
  isDefaultPassword: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ProfileChecker;
