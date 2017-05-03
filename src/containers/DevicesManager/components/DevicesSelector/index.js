import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import devices from 'configs/devices';

const kinds = devices.map(device => (
  <MenuItem
    key={device.id}
    value={device.id}
    primaryText={device.name}
  />
));

const DevicesSelector = ({
  value,
  onChange,
  ...rest,
}) => (
  <SelectField
    {...rest}
    floatingLabelText="Choose Model"
    name="model"
    value={value}
    onChange={onChange}
  >
    { kinds }
  </SelectField>
);

DevicesSelector.propTypes = {
  // DevicesSelector is controlled input
  // must be provided with onChange callback
  onChange: React.PropTypes.func.isRequired,

  // DevicesSelector is controlled input
  // must be provided with value
  value: React.PropTypes.string.isRequired,

  // text to display as an error
  errorText: React.PropTypes.string,
};

DevicesSelector.defaultProps = {
  errorText: null,
};

export default DevicesSelector;
