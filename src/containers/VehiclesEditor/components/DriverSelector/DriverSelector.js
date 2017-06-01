import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import classes from './classes';

import * as fromFleetReducer from 'services/FleetModel/reducer';

// let SelectedKindIcon = () => null;
const STYLES = {
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

class DriverSelector extends React.PureComponent {
  renderDrivers() {
    return this.props.drivers.map(drvr => <MenuItem
      key={drvr.id}
      value={drvr.id}
      primaryText={drvr.name}
      style={STYLES.menuItem}
    />);
  }

  render() {
    return (
      <div className={css(classes.kindOfSelector)} key="driver" >
        <div className={css(classes.kindOfLabel)}>
          <span className={css(classes.kindOfName)}> Driver</span>
        </div>
        <SelectField
          hintText={'select driver'}
          name="driver"
          value={this.props.driverId}
          onChange={this.props.onChange}
          style={{ top: -12 }}
        >
          {this.renderDrivers()}
        </SelectField>
      </div>);
  }
}

DriverSelector.propTypes = {
  driverId: React.PropTypes.string,
  drivers: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  drivers: fromFleetReducer.getDrivers(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(DriverSelector));
