import React from 'react';
import { connect } from 'react-redux';
import PasswordForm from './PasswordForm';
import { usersActions } from 'services/Users/actions';

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
  closeForm: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string.isRequired,
  changePassword: React.PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  changePassword: usersActions.changePassword,
};

export default connect(mapState, mapDispatch)(PasswordFormConnected);
