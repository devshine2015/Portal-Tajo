import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardHeader,
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
        primary
        label="Diactivate"
        onClick={onDiactivate}
      />
    </CardActions>
  );
}

// show warning if device not attached
function renderStatus(vehicleId) {
  if (!!vehicleId) {
    return null;
  }

  return (
    <div
      className={styles.warning}
      title="Not Attached to Any Vehicle"
    >
      <WarningIcon
        color={theme.palette.accent1Color}
        style={STYLES.warningicon}
      />
    </div>
  );
}

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
          { canDeactivate && renderActions(this.onDiactivate) }
        </Card>

        { renderStatus(this.props.vehicleId) }
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

  // object with available permissions from permitted
  userPermittedTo: React.PropTypes.object.isRequired,
};

const mapState = null;
const mapDispatch = null;

const PureDevice = pure(permitted(PERMISSIONS)(Device));

export default connect(mapState, mapDispatch)(PureDevice);
