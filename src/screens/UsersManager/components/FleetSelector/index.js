import React from 'react';
import PropTypes from 'prop-types';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import { authorizeWithRole } from 'utils/authz';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

function _renderFleets(availableFleets) {
  return availableFleets.map(fleet => (
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
  availableFleets,
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
      { _renderFleets(availableFleets) }
    </SelectField>
  );
};

FleetSelector.propTypes = {
  translations: phrasesShape.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  availableFleets: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default translate(phrases)(FleetSelector);
