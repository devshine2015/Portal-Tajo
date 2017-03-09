import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import IconSnow from 'material-ui/svg-icons/places/ac-unit';
import IconEnter from 'material-ui/svg-icons/action/exit-to-app';
import IconTrLight from 'material-ui/svg-icons/maps/traffic';
import IconRun from 'material-ui/svg-icons/maps/directions-run';
import IconProblem from 'material-ui/svg-icons/action/report-problem';
import IconLocation from 'material-ui/svg-icons/maps/pin-drop';
import IconLocationOff from 'material-ui/svg-icons/maps/place';

import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { makeAlertConditionBackEndObject } from 'services/AlertsSystem/alertConditionHelper';
import { createAlertConditions } from 'services/AlertsSystem/actions';
import { getAlertConditions, getAlertConditionByIdFunc } from 'services/AlertsSystem/reducer';


import styles from './styles.css';

const stylesChip = {
  margin: 3,
  width: 'initial',
};


class AlertsList extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.id !== nextProps.id) {
  //     this.setNewVehicleDetails(nextProps);
  //   }
  // }
            // <Avatar color="#156671" icon={<IconSnow />} />
  onItemClick = () => {
    // add condition to the vehicle
  }


  render() {
    const alertsToPick = this.props.alerts.map(item => (
          <Chip key={item.id}
            onTouchTap={this.onItemClick}
            style={stylesChip}
          >
           <Avatar color="#156671" icon={alertKinds.getAlertByKind(item.kind).icon} />
            {item.name}
          </Chip>));
    return (
      <div className={styles.alertsList}>
        {alertsToPick}
      </div>
    );
  }
}

AlertsList.propTypes = {
  // isLoading: React.PropTypes.bool.isRequired,
  // showSnackbar: React.PropTypes.func.isRequired,
  alerts: React.PropTypes.array.isRequired,
  alertById: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  alerts: getAlertConditions(state),
  alertById: getAlertConditionByIdFunc(state),
  // isLoading: getLoaderState(state),
});
const mapDispatch = {
  // showSnackbar,
};

const PureAlertsList = pure(AlertsList);

export default connect(mapState, mapDispatch)(PureAlertsList);

