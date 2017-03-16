import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddClose from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import IconSnow from 'material-ui/svg-icons/places/ac-unit';
import IconEnter from 'material-ui/svg-icons/action/exit-to-app';
import IconTrLight from 'material-ui/svg-icons/maps/traffic';
import IconRun from 'material-ui/svg-icons/maps/directions-run';
import IconProblem from 'material-ui/svg-icons/action/report-problem';
import IconLocation from 'material-ui/svg-icons/maps/pin-drop';
import IconLocationOff from 'material-ui/svg-icons/maps/place';
import AlertsList from './alertsList';
import { getVehicleAlertConditions, getAlertConditionByIdFunc } from 'services/AlertsSystem/reducer';
import { fetchVehicleAlertConditions, postVehicleAlertConditions } from 'services/AlertsSystem/actions';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

const stylesChip = {
  margin: 4,
};
const stylesAddBtn = {
  float: 'right',
};

function handleTouchTap() {
//  alert('You clicked the Chip.');
}

class VehicleAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      isLoading: true,
      alerts: [],      
    };
    this.props.saveHook(this.saveAlerts);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.vehicleId !== nextProps.vehicleId) {
      const vehAlertIds = this.props.getVehicleAlerts(nextProps.vehicleId);
      if (vehAlertIds===null) {
        this.setState({ alerts: [],
            isLoading: true });
        this.props.fetchVehicleAlertConditions(nextProps.vehicleId)
          .then(() => {
            // const vehAlertIds = this.props.getVehicleAlerts(nextProps.vehicleId);
            this.setState({ alerts: this.props.getVehicleAlerts(nextProps.vehicleId),
            isLoading: false });
          });
        } else {
        this.setState({ alerts: vehAlertIds,
            isLoading: false  });      
        }
    }
  }
  onRemoveClick = (alertId) => {
    this.setState({ alerts: this.state.alerts.filter((el) => (el !== alertId)) });
  }
  onAddClick = () => {
    this.setState({ isAdding: !this.state.isAdding });
  }
  doAddAlert = (alertId) => {
    this.setState({ alerts: this.state.alerts.concat([alertId]) });
  }
  saveAlerts = () => {
    this.props.postVehicleAlertConditions(this.props.vehicleId, this.state.alerts);
  }
// Temp -15&#8451;..-8&#8451;
  render() {
    const vehAlerts = this.state.alerts.map(alertId => {
      const alertObj = this.props.alertById(alertId);
      const alertKindData = alertKinds.getAlertByKind(alertObj.kind);
      return (<Chip
        key={alertId}
        onRequestDelete={ () => (this.onRemoveClick(alertId)) }
        style={stylesChip}
      >
          <Avatar color="#156671" icon={alertKindData.icon} />
            {alertObj.name}
          </Chip>);
    });

    return (
      <Paper zDepth={2} className={styles.wrapper}>
      <span >ALERTS</span>
      <FloatingActionButton style={stylesAddBtn} onClick={this.onAddClick}>
        {this.state.isAdding ? <ContentAddClose /> : <ContentAdd />}
      </FloatingActionButton>
      {!this.state.isAdding ? null :
          <AlertsList vehicleId={this.props.vehicleId}
            vehicleAlerts={this.state.alerts}
            doAddAlert={this.doAddAlert}
          />}
      {!this.state.isLoading ? null :
        <span> loading... </span>}
      <div className={styles.chipsWrapper}>
        {vehAlerts}
        </div>
      </Paper>
    );
  }
}

VehicleAlerts.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getVehicleAlerts: React.PropTypes.func.isRequired,
  fetchVehicleAlertConditions: React.PropTypes.func.isRequired,
  postVehicleAlertConditions: React.PropTypes.func.isRequired,
  alertById: React.PropTypes.func.isRequired,
  saveHook: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  getVehicleAlerts: getVehicleAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
});
const mapDispatch = {
  fetchVehicleAlertConditions,
  postVehicleAlertConditions,
};

const PureVehicleAlerts = pure(VehicleAlerts);

export default connect(mapState, mapDispatch)(PureVehicleAlerts);

