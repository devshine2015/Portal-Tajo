import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FormComponents from '../FormComponents';

class EmailForm extends React.Component {
  state = {
    email: undefined,
  }

  onSubmit = e => {
    e.preventDefault();

    // validate email here

    this.props.closeForm(this.props.userId, {
      email: this.state.email,
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
      <form>
        <FormComponents.Header center>
          Change email
        </FormComponents.Header>
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
      </form>
    );
  }
}

EmailForm.propTypes = {
  closeForm: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string.isRequired,
};

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(EmailForm);
