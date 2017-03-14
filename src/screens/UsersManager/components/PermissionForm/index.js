import React from 'react';
import { css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import FormComponents from '../FormComponents';

import classes from './classes';

class PermissionsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      action: undefined,
      resource: undefined,
      desc: undefined,
    };
  }

  onFleetChange = (e, key, value) => {
    this.updateState('fleet', value);
  }

  onRoleChange = (e, key, value) => {
    this.updateState('role', value);
  }

  onSubmit = e => {
    e.preventDefault();

    // this.props.addNewUser(this.state);
  }

  onType = e => {
    // const { name, value } = e.target;

    // this.updateState(name, value);
  }

  onCancel = () => {
    this.props.closeForm();
  }

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  focus = ref => {
    if (!ref) return;

    ref.focus();
  }

  render() {
    const { action, resource, desc } = this.state;
    const disabled = !!action && !!resource && !!desc;

    return (
      <div className={css(classes.editor)}>
        <FormComponents.Header>
          New permission
        </FormComponents.Header>

        <form
          name="permissionEditor"
          className={css(classes.form)}
          onSubmit={this.onSubmit}
        >
          <div className={css(classes.row)}>
            <div className={css(classes.inputWrapper)}>
              <TextField
                fullWidth
                floatingLabelText="Action"
                hintText="eg.: create"
                name="action"
                onChange={this.onType}
                ref={this.focus}
              />
            </div>
            <div className={css(classes.inputWrapper)}>
              <TextField
                fullWidth
                floatingLabelText="Resource"
                hintText="eg.: vehicle"
                name="resource"
                onChange={this.onType}
              />
            </div>
          </div>

          <TextField
            hintText="Description"
            multiLine
            fullWidth
            rows={2}
          />

          <FormComponents.Buttons
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            disabled={disabled}
            mainLabel="Create"
          />

        </form>
      </div>
    );
  }
}

PermissionsForm.propTypes = {
  closeForm: React.PropTypes.func.isRequired,
};

export default PermissionsForm;
