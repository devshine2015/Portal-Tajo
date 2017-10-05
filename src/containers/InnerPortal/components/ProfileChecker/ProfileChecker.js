import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  makePhrasesShape,
  translate,
} from 'utils/i18n';
import Overlay from 'components/User/Overlay';
import PasswordForm from 'containers/User/PasswordForm';
// import classes from './classes';

const phrases = [
  'change_default_password',
];

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
            headerText={this.props.translations.change_default_password}
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
  translations: makePhrasesShape(phrases).isRequired,
};

export default translate(phrases)(ProfileChecker);
