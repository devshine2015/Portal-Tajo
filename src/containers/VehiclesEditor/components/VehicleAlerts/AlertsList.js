import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Chip, Popover } from 'material-ui';
import { VelocityTransitionGroup } from 'velocity-react';
// import * as alertKinds from 'services/AlertsSystem/alertKinds';
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
        .filter(item => item.gfInvalid === undefined)
        .filter(item => !this.vehicleHasAlert(item.id)
            && this.props.alertFilter(item))
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
          onClick={() => this.onItemClick(item.id)}
          style={stylesChip}
        >
          {item.gfName !== '' ? item.gfName : item.name}
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
  isOpen: PropTypes.bool.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  alertFilter: PropTypes.func.isRequired,
  vehicleAlerts: PropTypes.array.isRequired,
  doAddAlert: PropTypes.func.isRequired,
  // getVehicleAlerts: React.PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
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

