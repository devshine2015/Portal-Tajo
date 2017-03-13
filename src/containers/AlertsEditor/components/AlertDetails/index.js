import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  Checkbox,
} from 'material-ui';
import Form from 'components/Form';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { showSnackbar } from 'containers/Snackbar/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { makeAlertConditionBackEndObject } from 'services/AlertsSystem/alertConditionHelper';
import { createAlertConditions } from 'services/AlertsSystem/actions';

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

  onSubmit = (e) => {
    e.preventDefault();
    this.postNew(makeAlertConditionBackEndObject(this.state));
    this.props.onSave();
  }

  /**
   * Update state[field] with value
   **/
  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
    });
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

  postNew = (newAlert) => {
    this.props.createAlertConditions([newAlert])
    .then(() => {
      this.props.showSnackbar('New Alert created successfuly', 3000);
    }, () => {
      this.props.showSnackbar('Failed to create new ALERT', 5000);
    });
  }

  renderKindMenuItems() {
    return alertKinds.ALERT_KINDS.map(kind => {
      const Icon = () => React.cloneElement(kind.icon, {
        className: styles.vehicleIcon,
      });

      return (
        <MenuItem
          key={kind.value}
          value={kind.value}
          primaryText={ kind.niceName.toLowerCase() }
          leftIcon={<Icon />}
          style={STYLES.menuItem}
        />
      );
    });
  }

  renderKindDetails() {
    switch (this.state.kind) {
      case alertKinds._ALERT_KIND_TEMPERATURE:
        return (<TextField
          fullWidth
          name="maxTemp"
          onChange={this.onChange}
          floatingLabelText={ "max temperature" }
          value={this.state.maxTemp}
          type="number"
        />);
      /*case alertKinds._ALERT_KIND_GF_ENTER:
        return (<SelectField
              autoWidth
              hintText="select geofence"
              name="geoFence"
              value={this.state.kind}
              onChange={this.onKindChange}
            >
              {this.renderKindMenuItems()}
            </SelectField>);*/
      default:
        return null;
    }
  }

  render() {
    let SelectedKindIcon = () => null;

    if (this.state.kind) {
      const selectedKind = alertKinds.getAlertByKind(this.state.kind);
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
  createAlertConditions: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
});

const mapDispatch = {
  createAlertConditions,
  showSnackbar,
};
// export default pure(AlertDetails);
const PureAlertDetails = pure(AlertDetails);
export default connect(mapState, mapDispatch)(PureAlertDetails);
