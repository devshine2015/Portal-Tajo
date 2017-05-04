import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { Paper, Chip, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddClose from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

import AlertsList from './AlertsList';

import { getAlertConditionByIdFunc,
    getAlertConditions } from 'services/AlertsSystem/reducer';

import * as alertKinds from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

const stylesChip = {
  margin: 4,
  height: 32,
};
const stylesAddBtn = {
  float: 'right',
};

class GFAlerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
    };
    // this.props.saveHook(this.saveAlerts);
  }

  onAddClick = () => {
    this.setState({ isAdding: !this.state.isAdding });
  }

  render() {
    // if (!isAlerts) return null;
    const alertKindData = alertKinds.getAlertByKind(alertKinds._ALERT_KIND_GF);
    const myGFAlerts = this.props.vehicleAlerts.map(alertId => (this.props.alertById(alertId)))
        .filter(alrt => alrt.kind === alertKinds._ALERT_KIND_GF && alrt.onEnter === this.props.onEnter)
        .map(alrt => (
          <Chip
            key={alrt.id}
            onRequestDelete={() => (this.props.onRemoveClick(alrt.id))}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={alertKindData.icon} />
            {alrt.name}
          </Chip>));
    return (
      <Paper zDepth={2} className={styles.wrapper}>
        <FloatingActionButton style={stylesAddBtn} onClick={this.onAddClick}>
          {this.state.isAdding ? <ContentAddClose /> : <ContentAdd />}
        </FloatingActionButton>
        {!this.state.isAdding ? null :
        <AlertsList
          vehicleId={this.props.vehicleId}
          vehicleAlerts={this.props.vehicleAlerts}
          doAddAlert={this.props.doAddAlert}
          onEnter={this.props.onEnter}
        />}

        <div className={styles.chipsWrapper}>
          {myGFAlerts}
        </div>
      </Paper>
    );
  }
}

GFAlerts.propTypes = {
  onEnter: React.PropTypes.bool.isRequired,
  vehicleId: React.PropTypes.string.isRequired,
  vehicleAlerts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  alertById: React.PropTypes.func.isRequired,
  alertConditions: React.PropTypes.array.isRequired,

  doAddAlert: React.PropTypes.func.isRequired,
  onRemoveClick: React.PropTypes.func.isRequired,
  // saveHook: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  alertById: getAlertConditionByIdFunc(state),
  alertConditions: getAlertConditions(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(GFAlerts));

