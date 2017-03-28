import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import {
  TextField,
} from 'material-ui';
import { usersActions } from 'services/Users/actions';
import {
  getIsLoading,
  getRoles,
} from 'services/Users/reducer';
import FormComponents from '../FormComponents';
import RolesSelector from '../RolesSelector';
import FleetSelector from '../FleetSelector';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.input = undefined;

    this.state = {
      email: undefined,
      password: undefined,
      role: undefined,
      fleet: 'mwa',
    };
  }

  componentDidMount() {
    if (this.props.isOpened) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpened && nextProps.isOpened) {
      this.input.focus();
    }
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

  onRoleChange = (e, key, value) => {
    this.updateState('role', value);
  }

  onFleetChange = (e, key, value) => {
    this.updateState('fleet', value);
  }

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  saveInput = ref => {
    if (!ref) return;

    this.input = ref;
  }

  render() {
    const { translations } = this.props;
    const { username, password, role, fleet } = this.state;
    const disabled = !!username && !!password && !!role && !!fleet;
    const submitButtonText = this.props.editMode === 'create' ?
      translations.create : translations.update;

    return (
      <div>
        <FormComponents.Header>
          { translations.add_new_user }
        </FormComponents.Header>
        <form
          name="userEditor"
          onSubmit={this.onSubmit}
        >
          <TextField
            fullWidth
            floatingLabelText={translations.email}
            name="email"
            onChange={this.onType}
            ref={this.saveInput}
          />
          <TextField
            fullWidth
            floatingLabelText={translations.password}
            name="password"
            type="password"
            onChange={this.onType}
          />
          <RolesSelector
            allRoles={this.props.roles}
            onChange={this.onRoleChange}
            value={this.state.role}
          />
          <FleetSelector
            onChange={this.onFleetChange}
            value={this.state.fleet}
          />

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
  isOpened: React.PropTypes.bool.isRequired,
  translations: phrasesShape.isRequired,
  roles: React.PropTypes.instanceOf(Map).isRequired,
};

NewUserForm.defaultProps = {
  editMode: 'create',
};

const mapState = state => ({
  isLoading: getIsLoading(state),
  roles: getRoles(state),
});
const mapDispatch = {
  createUser: usersActions.createUser,
};

const Translated = translate(phrases)(NewUserForm);
const PureNewUserForm = pure(Translated);

export default connect(mapState, mapDispatch)(PureNewUserForm);
