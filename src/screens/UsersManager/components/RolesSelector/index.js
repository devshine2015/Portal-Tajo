import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

function _renderRoles(roles, authorizeWithRole) {
  return roles.toArray().map(r => {
    const role = r.toJS();

    // only uber can create other ubers
    if (role.name.toLowerCase() === 'uber' && !authorizeWithRole('uber')) {
      return null;
    }

    return (
      <MenuItem
        key={role._id}
        value={role._id}
        primaryText={role.name}
      />
    );
  });
}

const RolesSelector = ({
  allRoles,
  translations,
  onChange,
  value,
}, {
  authorizeWithRole,
}) => (
  <SelectField
    fullWidth
    floatingLabelFixed
    floatingLabelText={translations.choose_role}
    name="role"
    value={value}
    onChange={onChange}
  >
    { _renderRoles(allRoles, authorizeWithRole) }
  </SelectField>
);

RolesSelector.contextTypes = {
  authorizeWithRole: PropTypes.func.isRequired,
};

RolesSelector.propTypes = {
  translations: phrasesShape.isRequired,
  allRoles: PropTypes.instanceOf(Map).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default translate(phrases)(RolesSelector);
