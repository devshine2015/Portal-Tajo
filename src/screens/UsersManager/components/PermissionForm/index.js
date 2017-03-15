import React from 'react';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import TextField from 'material-ui/TextField';
import FormComponents from '../FormComponents';
import { permissionsActions } from 'services/Users/actions';

import classes from './classes';

const initialState = {
  action: undefined,
  resource: undefined,
  desc: undefined,
};

class PermissionsForm extends React.Component {
  constructor(props) {
    super(props);

    this.form = undefined;

    this.state = initialState;
  }

  onSubmit = e => {
    e.preventDefault();

    const { action, resource, desc } = this.state;
    const payload = {
      name: `${action}:${resource}`,
      desc,
    };

    this.setState(initialState, () => {
      this.props.createPermission(payload);
      // this.form.reset();
      this.props.closeForm();
    });
  }

  onType = e => {
    const { name, value } = e.target;

    this.updateState(name, value.trim());
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

  keepFormRef = ref => {
    this.form = ref;
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
          ref={this.keepFormRef}
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
            onChange={this.onType}
            hintText="Description"
            multiLine
            fullWidth
            name="desc"
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
  createPermission: React.PropTypes.func.isRequired,
};

const mapDispatch = {
  createPermission: permissionsActions.createPermission,
};

export default connect(null, mapDispatch)(PermissionsForm);
