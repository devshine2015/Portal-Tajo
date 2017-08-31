import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import * as fromFleetReducer from 'services/FleetModel/reducer';
import classes from './classes';
import phrases from './PropTypes';

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
    const { translations } = this.props;

    return (
      <div className={css(classes.kindOfSelector)}>
        <div className={css(classes.kindOfLabel)}>
          <span className={css(classes.kindOfName)}>
            { translations.driver }
          </span>
        </div>
        <SelectField
          hintText={translations.select_driver}
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
  driverId: PropTypes.string,
  drivers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

const mapState = state => ({
  drivers: fromFleetReducer.getDrivers(state),
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(pure(translate(phrases)(DriverSelector)));
