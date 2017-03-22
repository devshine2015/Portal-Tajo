import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import portals from 'configs/portals';
import {
  TextField,
  // SelectField,
  MenuItem,
} from 'material-ui';
import { usersActions } from 'services/Users/actions';
import { getIsLoading } from 'services/Users/reducer';
import FormComponents from '../FormComponents';

import styles from './styles.css';

// const roles = [
//   <MenuItem key={1} value="uber" primaryText="Uber" />,
//   <MenuItem key={2} value="admin" primaryText="Administrator" />,
//   <MenuItem key={3} value="manager" primaryText="Manager" />,
//   <MenuItem key={4} value="installer" primaryText="Installer" />,
// ];

// const fleets = portals.map(portal => (
//   <MenuItem
//     key={portal.fleet}
//     value={portal.fleet}
//     primaryText={portal.niceName}
//   />
// ));

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      // role: 'installer',
      // fleet: null,
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

    this.props.createUser(this.state)
      .then(() => this.props.closeForm());
  }

  onType = e => {
    const { name, value } = e.target;

    this.updateState(name, value);
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
    const { username, password, role, fleet } = this.state;
    const disabled = !!username && !!password && !!role && !!fleet;
    const submitButtonText = this.props.editMode === 'create' ? 'Create' : 'Update';

    return (
      <div className={styles.editor}>
        <FormComponents.Header>
          Add new user
        </FormComponents.Header>
        <form
          name="userEditor"
          className={styles.form}
          onSubmit={this.onSubmit}
        >
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <TextField
                fullWidth
                floatingLabelText="Email"
                name="email"
                onChange={this.onType}
                ref={this.focus}
              />
            </div>
            <div className={styles.inputWrapper}>
              <TextField
                fullWidth
                floatingLabelText="Password"
                name="password"
                type="password"
                onChange={this.onType}
              />
            </div>
          </div>
          {/* <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <SelectField
                fullWidth
                floatingLabelFixed
                floatingLabelText="Choose fleet"
                name="fleet"
                value={this.state.fleet}
                onChange={this.onFleetChange}
              >
                {fleets}
              </SelectField>
            </div>
            <div className={styles.inputWrapper}>
              <SelectField
                fullWidth
                floatingLabelFixed
                floatingLabelText="Choose role"
                name="role"
                value={this.state.role}
                onChange={this.onRoleChange}
              >
                {roles}
              </SelectField>
            </div>
          </div>*/}

          <FormComponents.Buttons
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            disabled={this.props.isLoading || !disabled}
            mainLabel={submitButtonText}
          />

        </form>
      </div>
    );
  }
}

NewUserForm.propTypes = {
  createUser: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.oneOf([
    'create', 'edit',
  ]),
  closeForm: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
};

NewUserForm.defaultProps = {
  editMode: 'create',
};

const mapState = state => ({
  isLoading: getIsLoading(state),
});
const mapDispatch = {
  createUser: usersActions.createUser,
};

const PureNewUserForm = pure(NewUserForm);

export default connect(mapState, mapDispatch)(PureNewUserForm);
