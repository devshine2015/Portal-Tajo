import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import DetailPopupForm from '../DetailPopupForm';
import FormComponents from '../FormComponents';
import { usersActions } from 'services/Users/actions';

class EmailForm extends React.Component {
  state = {
    email: undefined,
    isFetching: false,
  }

  onSubmit = e => {
    e.preventDefault();

    // validate email here

    this.setState({
      isFetching: true,
    }, () => {
      this.props.changeEmail(this.props.userId, {
        email: this.state.email,
      })
        .then(() => this.props.closeForm());
    });
  }

  onChange = e => {
    this.setState({
      email: e.target.value.trim(),
    });
  }

  focus = ref => {
    if (!ref) return;

    ref.focus();
  }

  render() {
    return (
      <DetailPopupForm
        headerText="Change email"
        isFetching={this.state.isFetching}
      >
        <TextField
          hintText="New email"
          onChange={this.onChange}
          ref={this.focus}
        />

        <FormComponents.Buttons
          onSubmit={this.onSubmit}
          onCancel={this.props.closeForm}
          disabled={!!this.state.email}
          mainLabel="Submit"
        />
      </DetailPopupForm>
    );
  }
}

EmailForm.propTypes = {
  closeForm: React.PropTypes.func.isRequired,
  changeEmail: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string.isRequired,
};

const mapState = null;
const mapDispatch = {
  changeEmail: usersActions.changeEmail,
};

export default connect(mapState, mapDispatch)(EmailForm);
