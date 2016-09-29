import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import portals from 'configs/portals';
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton,
  FlatButton,
} from 'material-ui';
import { toggleNewUser } from 'containers/UsersManager/actions';

import styles from './styles.css';

const roles = [
  <MenuItem key={1} value="uber" primaryText="Uber" />,
  <MenuItem key={2} value="admin" primaryText="Administrator" />,
  <MenuItem key={3} value="manager" primaryText="Manager" />,
  <MenuItem key={4} value="installer" primaryText="Installer" />,
];

const fleets = portals.map(portal => (
  <MenuItem
    key={portal.fleet}
    value={portal.fleet}
    primaryText={portal.niceName}
  />
));

class UserEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      role: 'installer',
      fleet: null,
      status: 'active',
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
  }

  onType = e => {
    const { name, value } = e.target;

    this.updateState(name, value);
  }

  onCancel = () => {
    this.props.toggleNewUser(false);
  }

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { username, password, role, fleet } = this.state;
    const disabled = !!username && !!password && !!role && !!fleet;
    const submitButtonText = this.props.editMode === 'create' ? 'Create' : 'Update';

    return (
      <div className={styles.editor}>
        <h3 className={styles.header}>Add new user</h3>
        <form
          name="userEditor"
          className={styles.form}
        >
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <TextField
                fullWidth
                floatingLabelText="Username"
                name="username"
                onChange={this.onType}
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
          <div className={styles.row}>
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
          </div>
          <div className={styles.buttons}>
            <RaisedButton
              label={submitButtonText}
              type="submit"
              disabled={!disabled}
              secondary
            />
            <FlatButton
              label="Cancel"
              type="reset"
              onClick={this.onCancel}
            />
          </div>
        </form>
      </div>
    );
  }
}

UserEditor.propTypes = {
  editMode: React.PropTypes.oneOf([
    'create', 'edit',
  ]).isRequired,
  toggleNewUser: React.PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  toggleNewUser,
};

const PureUserEditor = pure(UserEditor);

export default connect(mapState, mapDispatch)(PureUserEditor);
