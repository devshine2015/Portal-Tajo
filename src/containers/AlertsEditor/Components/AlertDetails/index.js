import React from 'react';
import pure from 'recompose/pure';
import {
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Checkbox,
} from 'material-ui';
import Form from 'components/Form';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { ALERT_KINDS, getAlertByValue } from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

const FORM = 'editor';
const STYLES = {
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

function setAlertState(props) {
  return {
    maxTemp: 1,
    minTemp: -5,
    speedLimit: 45,
    ...props.details,
  };
}

class AlertDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     **/
    this.state = setAlertState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.details.id !== nextProps.id) {
      this.setNewAlertDetails(nextProps);
    }
  }

  onCancel = () => {
    this.props.onCancel();
  }
  /**
   * this is what back-end alert condition model looks like
   "id":"String",      // stable id assigned upon creation
   "kind":"String",    // type of alert condition
   ...
   // condition specific fields
   ...
   "status":"active|inactive", // status of alert condition, active upon creation
                               // deleted conditions transitions to inactive
                               // but still can be referenced by id for eventual consistency
   "created":"ISO8601",        // creation timestamp
   "updatedBy":"UserId",       // user created/updated alert condition
   "updated":"ISO8601",        // optional update timestamp (??? if conditions will be mutable)
   "meta": ["k":"v", ...]      // optional associated metadata for consumer, passed with
   **/
  onSubmit = (e) => {
    e.preventDefault();
    const toSave = Object.assign({}, this.state);

    

    this.props.onSave();
  }

  /**
   * Update state[field] with value
   **/
  onChange = (e, value) => {
    // const field = e.target.name;

    // this.setState({
    //   [field]: value,
    // });
  }

  onKindChange = (e, key, value) => {
    this.setState({
      kind: value,
    });
  }

  /**
   * Update state if another alert has been chosen
   **/
  setNewAlertDetails(nextProps) {
    this.setState(setAlertState(nextProps));
  }

  renderKindMenuItems() {
    return ALERT_KINDS.map(kind => {
      const Icon = () => React.cloneElement(kind.icon, {
        className: styles.vehicleIcon,
      });

      return (
        <MenuItem
          key={kind.value}
          value={kind.value}
          primaryText={ kind.value.toLowerCase() }
          leftIcon={<Icon />}
          style={STYLES.menuItem}
        />
      );
    });
  }

  renderKindDetails() {
    switch (this.state.kind) {
      case 'TEMPERATURE':
        return (<div> <TextField
          fullWidth
          name="tempMin"
          onChange={this.onChange}
          floatingLabelText={ "min temperature" }
          value={this.state.minTemp}
          type="number"
        />
        <TextField
          fullWidth
          name="tempMax"
          onChange={this.onChange}
          floatingLabelText={ "max temperature" }
          value={this.state.maxTemp}
          type="number"
        /> </div>);
      case 'SPEED':
        return (<TextField
          fullWidth
          name="speedLimit"
          onChange={this.onChange}
          floatingLabelText={ "speed limit" }
          value={this.state.speedLimit}
          type="number"
        />);
      default:
        return null;
    }
  }

  render() {
    let SelectedKindIcon = () => null;

    if (this.state.kind) {
      const selectedKind = getAlertByValue(this.state.kind);
      SelectedKindIcon = () => selectedKind.icon;
    }

    return (
      <div className={styles.details}>
        <Form
          name={FORM}
          onSubmit={this.onSubmit}
        >
          <TextField
            fullWidth
            name="name"
            onChange={this.onChange}
            floatingLabelText="alert name"
            value={this.state.name}
          />

          <div className={styles.kind}>
            <SelectField
              autoWidth
              hintText="select alert kind"
              name="kind"
              value={this.state.kind}
              onChange={this.onKindChange}
            >
              {this.renderKindMenuItems()}
            </SelectField>
            <span className={styles.selectedKindIcon}>
              <SelectedKindIcon />
            </span>
          </div>
          {this.renderKindDetails()}
          <div className={styles.buttons}>
            <FlatButton
              className={styles.buttons__button}
              onClick={this.onCancel}
              label={ "cancel" }
            />
            <ButtonWithProgress
              isLoading={false}
              disabled={false}
              className={styles.buttons__button}
              onClick={this.onSubmit}
              label={ "save" }
              type="submit"
              primary
            />
          </div>
        </Form>
      </div>
    );
  }
}

AlertDetails.propTypes = {
  // disabled: React.PropTypes.bool.isRequired,
  // isLoading: React.PropTypes.bool.isRequired,
  details: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    kind: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

export default pure(AlertDetails);
