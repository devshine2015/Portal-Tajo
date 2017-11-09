import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import { translate } from 'utils/i18n';
import { VEHICLE_KINDS, getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';

import phrases, { phrasesShape } from './PropTypes';
import classes from './classes';

let SelectedKindIcon = () => null;
const STYLES = {
  menuItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
};

class VehicleKindSelector extends React.PureComponent {
  renderKindMenuItems() {
    const { translations } = this.props;

    return VEHICLE_KINDS.map(kind => {
      const Icon = () => React.cloneElement(kind.icon, {
        className: css(classes.vehicleIcon),
      });

      return (
        <MenuItem
          key={kind.value}
          value={kind.value}
          primaryText={ translations[kind.value.toLowerCase()] }
          leftIcon={<Icon />}
          style={STYLES.menuItem}
        />
      );
    });
  }

  render() {
    if (this.props.kind) {
      const selectedKind = getVehicleByValue(this.props.kind);
      SelectedKindIcon = () => selectedKind.icon;
    }

    return (
      <div className={css(classes.kind)}>
        <SelectField
          autoWidth
          hintText={ this.props.translations.vehicle_kind_hint }
          name="kind"          
          value={this.props.kind}
          onChange={this.props.onChange}
          floatingLabelText="Vehicle Kind"
        >
          {this.renderKindMenuItems()}
        </SelectField>
        <span className={css(classes.selectedKindIcon)}>
          <SelectedKindIcon />
        </span>
      </div>
    );
  }
}

VehicleKindSelector.propTypes = {
  kind: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  translations: phrasesShape.isRequired,
};

export default translate(phrases)(VehicleKindSelector);
