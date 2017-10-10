import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersActions } from 'services/Users/actions';
import PasswordForm from './PasswordForm';

class PasswordFormConnected extends React.Component {
  onSubmit = (newPass) => {
    const { closeForm, forCurrentUser, userId, changePassword } = this.props;

    changePassword(userId, newPass, forCurrentUser)
      .then(closeForm);
  }

  render() {
    const { closeForm, changePassword, ...props } = this.props;

    return (
      <PasswordForm
        closeForm={this.props.closeForm}
        onSubmit={this.onSubmit}
        {...props}
      />
    );
  }
}

PasswordFormConnected.propTypes = {
  closeForm: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
  forCurrentUser: PropTypes.bool,
};

PasswordFormConnected.defaultProps = {
  forCurrentUser: false,
};

const mapState = null;
const mapDispatch = {
  changePassword: usersActions.changePassword,
};

export default connect(mapState, mapDispatch)(PasswordFormConnected);
