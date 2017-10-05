import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usersActions } from 'services/Users/actions';
import PasswordForm from './PasswordForm';

class PasswordFormConnected extends React.Component {
  onSubmit = (newPass) => {
    this.props.changePassword(this.props.userId, {
      password: newPass,
    })
      .then(() => this.props.closeForm());
  }

  render() {
    return (
      <PasswordForm
        closeForm={this.props.closeForm}
        onSubmit={this.onSubmit}
      />
    );
  }
}

PasswordFormConnected.propTypes = {
  closeForm: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  changePassword: usersActions.changePassword,
};

export default connect(mapState, mapDispatch)(PasswordFormConnected);
