import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardHeader,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import styles from './styles.css';

class Device extends React.Component {
  render() {
    return (
      <div className={styles.deviceContainer}>
        <Card>
          <CardHeader
            title={this.props.sn}
            subtitle={this.props.kind}
          />
          <CardActions className={styles.actions}>
            <FlatButton
              primary
              label="Diactivate"
              onClick={this.onDiactivate}
            />
          </CardActions>
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
};

const mapState = null;
const mapDispatch = null;

const PureDevice = pure(Device);

export default connect(mapState, mapDispatch)(PureDevice);
