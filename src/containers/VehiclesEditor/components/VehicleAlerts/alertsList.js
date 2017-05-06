import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Avatar, Chip, Popover } from 'material-ui';
import { VelocityTransitionGroup } from 'velocity-react';
import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { getAlertConditions } from 'services/AlertsSystem/reducer';

const stylesChip = {
  margin: 3,
  width: 'initial',
};
const stylesList = {
  minHeight: 73,
  minWidth: 200,
};


class AlertsList extends React.Component {
  onItemClick = (alertId) => {
    // add condition to the vehicle
    this.props.doAddAlert(alertId);
  }

  vehicleHasAlert = alertId => (
    this.props.vehicleAlerts
          .find(el => el === alertId) !== undefined
  )

  render() {
              // <Avatar color="#156671" icon={alertKinds.getAlertByKind(item.kind).icon} />
    const alertsToPick = this.props.alerts
        .filter(item => !this.vehicleHasAlert(item.id)
            && item.kind === alertKinds._ALERT_KIND_GF
            && item.onEnter === this.props.onEnter)
        // // doing this so we have original GFs names            
        // .map((item) => {
        //   const gfObject = this.props.gfById(item.gfId);
        //   return { name: gfObject.name, id: item.id };
        // })
        .sort((a, b) => {
          const nameA = a.gfName.toUpperCase();
          const nameB = b.gfName.toUpperCase();
          return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
        })
        .map(item => <Chip
          key={item.id}
          onTouchTap={() => this.onItemClick(item.id)}
          style={stylesChip}
        >
          {item.gfName}
        </Chip>);

    return (
      <Popover
        open={this.props.isOpen}
        onRequestClose={this.props.handleRequestClose}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <div style={stylesList}>
          <VelocityTransitionGroup
            enter={{ animation: 'slideDown', duration: 200 }}
            leave={{ animation: 'slideUp', duration: 200 }}
          >
            {alertsToPick}
          </VelocityTransitionGroup>
        </div>
      </Popover>
    );
  }
}

AlertsList.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  handleRequestClose: React.PropTypes.func.isRequired,
  anchorEl: React.PropTypes.object,
  onEnter: React.PropTypes.bool.isRequired,
  vehicleAlerts: React.PropTypes.array.isRequired,
  doAddAlert: React.PropTypes.func.isRequired,
  // getVehicleAlerts: React.PropTypes.func.isRequired,
  alerts: React.PropTypes.array.isRequired,
};

AlertsList.defaultProps = {
  anchorEl: null,
};

const mapState = state => ({
  alerts: getAlertConditions(state),
});
const mapDispatch = null;

const PureAlertsList = pure(AlertsList);

export default connect(mapState, mapDispatch)(PureAlertsList);

