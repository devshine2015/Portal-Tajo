import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import FormComponents from '../FormComponents';
import { rolesActions } from 'services/Users/actions';

const initialState = {
  name: undefined,
  desc: undefined,
};

class RoleForm extends React.Component {
  constructor(props) {
    super(props);

    this.form = undefined;

    this.state = initialState;
  }

  onSubmit = e => {
    e.preventDefault();

    const payload = this.state;

    this.setState(initialState, () => {
      this.props.createRole(payload);
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
    const { name, desc } = this.state;
    const disabled = !!name && !!desc;

    return (
      <div>
        <FormComponents.Header>
          New role
        </FormComponents.Header>

        <form
          name="roleEditor"
          onSubmit={this.onSubmit}
          ref={this.keepFormRef}
        >
          <TextField
            fullWidth
            floatingLabelText="Role Name"
            hintText="eg.: administrator"
            name="name"
            onChange={this.onType}
            ref={this.focus}
          />

          <TextField
            onChange={this.onType}
            hintText="Description"
            multiLine
            fullWidth
            name="desc"
            rows={2}
          />

          <p>
            TODO: Existing users can be assigned to the new role here
          </p>

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

RoleForm.propTypes = {
  closeForm: React.PropTypes.func.isRequired,
  createRole: React.PropTypes.func.isRequired,
};

const mapDispatch = {
  createRole: rolesActions.createRole,
};

export default connect(null, mapDispatch)(RoleForm);
