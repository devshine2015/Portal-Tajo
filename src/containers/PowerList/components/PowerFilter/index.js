import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import styles from './styles.css';
import { commonFleetActions } from 'services/FleetModel/actions';
import { connect } from 'react-redux';
import * as ListTypes from './../../types';

import { red500, yellow500, blue100 } from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionDrvr from 'material-ui/svg-icons/social/person';
import FltrDrvr from 'material-ui/svg-icons/alert/warning';

const changeForMe = (meThis) => (ev) => {
  meThis.updateTextFilter(ev);
};

class PowerFilter extends React.Component {

  updateTextFilter(event) {
    switch (this.props.type) {
      case ListTypes.LIST_VEHICLES:
        this.props.filterVehFunc(event.target.value);
        break;
      case ListTypes.LIST_LOCATIONS:
        this.props.filterVehFunc(event.target.value);
        break;
      default:
    }
  }
  render() {
    return (
      <div className={styles.searchBoxContainer}>
        <TextField
          onChange={changeForMe(this)}
          hintText="Search"
        />
        <div className={styles.presetBtnsArea}>
        <IconButton tooltip="Select Static">
          <ActionHome color={yellow500} />
        </IconButton>
        <IconButton tooltip="No drivers">
          <ActionDrvr color={blue100} />
        </IconButton>
        <IconButton tooltip="Alarm">
          <FltrDrvr color={red500} />
        </IconButton>
        </div>
      </div>
    );
  }
}

PowerFilter.propTypes = {
  type: React.PropTypes.string.isRequired,
  items: React.PropTypes.array.isRequired,
  filterVehFunc: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  filterVehFunc: commonFleetActions.filterVehiclesDo,
};

const PurePowerFilter = pure(PowerFilter);

export default connect(mapState, mapDispatch)(PurePowerFilter);
