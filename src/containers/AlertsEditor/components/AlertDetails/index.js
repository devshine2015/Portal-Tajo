import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  TextField,
  SelectField,
  MenuItem,
  FlatButton,
  DropDownMenu,
  Checkbox,
} from 'material-ui';
import Form from 'components/Form';
import ButtonWithProgress from 'components/ButtonWithProgress';
import { showSnackbar } from 'containers/Snackbar/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { makeAlertConditionBackEndObject, _NEW_LOCAL_ALERT_ID_ } from 'services/AlertsSystem/alertConditionHelper';
import { createAlertConditions, updateAlertCondition } from 'services/AlertsSystem/actions';
import { getGFsExSorted } from 'services/FleetModel/reducer';

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
    gfId: props.gfs[0].id,
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
    if (this.props.details.id === _NEW_LOCAL_ALERT_ID_) {
      this.postNew(makeAlertConditionBackEndObject(this.state));
      this.props.onSave();
    }
    else {
      this.putExisting(makeAlertConditionBackEndObject(this.state));
    }
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
  onChangeGF = (event, index, gfId) => this.setState({ gfId });

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

  putExisting = (newAlert) => {
    this.props.updateAlertCondition(newAlert)
    .then(() => {
      this.props.showSnackbar('Alert updated successfuly', 3000);
    }, () => {
      this.props.showSnackbar('Failed to change alert ALERT', 5000);
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
          name="maxTemp"
          onChange={this.onChange}
          floatingLabelText={ "max temperature" }
          value={this.state.maxTemp}
          type="number"
        />);
      case alertKinds._ALERT_KIND_GF: {
        const gfsArray = this.props.gfs;
        // const gfs = gfsArray.map((aGF) => (<MenuItem primaryText={aGF.name} />));
        const gfs = gfsArray.map((aGF) => (<MenuItem value={aGF.id} key={aGF.id} primaryText={aGF.name} />));
        return (<div>
          <SelectField maxHeight={300} value={this.state.gfId} onChange={this.onChangeGF}
            autoWidth hintText="select GeoFence" name="GeoFence"
          >
            {gfs}
          </SelectField>
          <Checkbox
            label="Alert on Enter"
            name="onEnter"
            checked={this.state.onEnter}
            onCheck={this.onChange}
          />
          <Checkbox
            label="Alert on Exit"
            name="onExit"
            checked={this.state.onExit}
            onCheck={this.onChange}
          />
          </div>
          );
      }
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
  updateAlertCondition: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  gfs: React.PropTypes.array.isRequired,
};

const mapState = (state) => ({
  gfs: getGFsExSorted(state),
});

const mapDispatch = {
  createAlertConditions,
  updateAlertCondition,
  showSnackbar,
};
// export default pure(AlertDetails);
const PureAlertDetails = pure(AlertDetails);
export default connect(mapState, mapDispatch)(PureAlertDetails);
