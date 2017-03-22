import React from 'react';
import TextField from 'material-ui/TextField';
import FormComponents from '../FormComponents';

class EmailForm extends React.Component {
  state = {
    newPass: undefined,
    repeat: undefined,
    repeatedCorrectly: false,
  }

  onPasswordChange = e => {
    const { value } = e.target;

    this.setState({
      repeatedCorrectly: value === this.state.repeat,
      newPass: value,
    });
  }

  onRepeatType = e => {
    const { value } = e.target;

    this.setState({
      repeatedCorrectly: value === this.state.newPass,
      repeat: value,
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
          Change password
        </FormComponents.Header>
        <TextField
          hintText="New password"
          onChange={this.onPasswordChange}
          type="password"
          name="newPass"
          ref={this.focus}
        />
        <TextField
          hintText="Repeat password"
          onChange={this.onRepeatType}
          type="password"
          name="repeat"
        />

        <FormComponents.Buttons
          onSubmit={this.props.onSubmit}
          onCancel={this.props.onCancel}
          disabled={this.state.repeatedCorrectly}
          mainLabel="Submit"
        />
      </form>
    );
  }
}

export default EmailForm;
