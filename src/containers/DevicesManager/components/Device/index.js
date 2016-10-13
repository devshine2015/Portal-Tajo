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
import { permissions } from 'configs/roles';
import permitted from 'utils/permissionsRequired';

import styles from './styles.css';

const PERMISSIONS = [
  permissions.DEVICES_DEACTIVATE,
];

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
        <Card
          className={cardClassName}
          // style={{minHeight: 150}}
          // containerStyle={{minHeight: 150}}
        >
          <CardHeader
            title={this.props.sn}
            subtitle={this.props.kind}
          />
          { canDeactivate && renderActions(this.onDiactivate) }
        </Card>
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
