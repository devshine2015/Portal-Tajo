import React from 'react';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

const fleets = ['mwa'];

function _renderFleets() {
  return fleets.map(fleet => (
    <MenuItem
      key={fleet}
      value={fleet}
      primaryText={fleet}
    />
  ));
}

const FleetSelector = ({
  translations,
  onChange,
  value,
}, {
  authorizeWithRole,
}) => {
  // only uber may assign fleet for user
  if (!authorizeWithRole('uber')) {
    return null;
  }

  return (
    <SelectField
      fullWidth
      floatingLabelFixed
      floatingLabelText={translations.choose_fleet}
      name="fleet"
      value={value}
      onChange={onChange}
    >
      { _renderFleets() }
    </SelectField>
  );
};

FleetSelector.contextTypes = {
  authorizeWithRole: React.PropTypes.func.isRequired,
};

FleetSelector.propTypes = {
  translations: phrasesShape.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
};

export default translate(phrases)(FleetSelector);
