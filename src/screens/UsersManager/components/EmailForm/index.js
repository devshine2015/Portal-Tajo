import React from 'react';
import TextField from 'material-ui/TextField';
import FormComponents from '../FormComponents';

class EmailForm extends React.Component {
  state = {
    newEmail: undefined,
  }

  onChange = e => {
    this.setState({
      newEmail: e.target.value.trim(),
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
          onSubmit={this.props.onSubmit}
          onCancel={this.props.onCancel}
          disabled={!!this.state.newEmail}
          mainLabel="Submit"
        />
      </form>
    );
  }
}

export default EmailForm;
