import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import WarningIcon from 'material-ui/svg-icons/alert/warning';
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';
import theme from 'configs/theme';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.DEVICES_DEACTIVATE,
];

const STYLES = {
  warningicon: {
    height: 20,
    width: 20,
  },
};

function userCan(permission, userPermittedTo) {
  return userPermittedTo[permission];
}

function renderActions(onDiactivate) {
  return (
    <CardActions className={styles.actions}>
      <FlatButton
        disabled
        label="Diactivate (Not Working)"
        onClick={onDiactivate}
      />
    </CardActions>
  );
}

const vehicleNotCorrectText = id => `No such vehicle with id: ${id}`;
const deviceNotAttached = 'Device not attached to any vehicle';

// show warning if device not attached
// or no such vehicle
const Status = ({
  vehicleId,
  correctVehicle,
}) => {
  // attached and id is correct
  if (!!vehicleId && correctVehicle) {
    return null;
  }

  let title = '';

  if (!vehicleId) {
    title = 'Not Attached to Any Vehicle';
  } else if (!correctVehicle) {
    title = 'No such vehicle in fleet';
  }

  return (
    <div
      className={styles.warning}
      title={title}
    >
      <WarningIcon
        color={theme.palette.accent1Color}
        style={STYLES.warningicon}
      />
    </div>
  );
};

Status.propTypes = {
  vehicleId: React.PropTypes.string,
  correctVehicle: React.PropTypes.bool.isRequired,
};

// show vehicle name if device attached
const Text = ({
  vehicleId,
  vehicleName,
  correctVehicle,
}) => {
  let text = '';

  if (!!vehicleId && correctVehicle) {
    text = vehicleName;
  } else if (!vehicleId) {
    text = deviceNotAttached;
  } else if (!correctVehicle) {
    text = vehicleNotCorrectText(vehicleId);
  }
  return (
    <CardText>
      { text }
    </CardText>
  );
};

Text.propTypes = {
  vehicleId: React.PropTypes.string,
  vehicleName: React.PropTypes.string,
  correctVehicle: React.PropTypes.bool.isRequired,
};

class Device extends React.Component {

  onDiactivate = () => {
    console.log(this.props.id);
  }

  render() {
    const canDeactivate = userCan(permissions.DEVICES_DEACTIVATE, this.props.userPermittedTo);
    const cardClassName = cs(styles.card, {
      [styles.card_withActions]: canDeactivate,
    });

    return (
      <div className={styles.deviceContainer}>
        <Card className={cardClassName}>
          <CardHeader
            title={this.props.sn}
            subtitle={this.props.kind}
          />
          <Text {...this.props} />
          { canDeactivate && renderActions(this.onDiactivate) }
        </Card>

        <Status {...this.props} />
      </div>
    );
  }
}

Device.propTypes = {
  // device id
  id: React.PropTypes.string.isRequired,

  // serial-number or imei.
  // Usually equal to id
  sn: React.PropTypes.string.isRequired,

  // device model
  kind: React.PropTypes.string,

  // could be active or not
  status: React.PropTypes.oneOf(['active']),

  // id of vehicle device attached to
  // could be undefined
  vehicleId: React.PropTypes.string,

  // name of vehicle device attached to
  vehicleName: React.PropTypes.string,

  // true no vehicles with such vehicleId in the fleet
  correctVehicle: React.PropTypes.bool.isRequired,

  // object with available permissions from permitted
  userPermittedTo: React.PropTypes.object.isRequired,
};

const mapState = null;
const mapDispatch = null;

const PureDevice = pure(permitted(PERMISSIONS)(Device));

export default connect(mapState, mapDispatch)(PureDevice);
