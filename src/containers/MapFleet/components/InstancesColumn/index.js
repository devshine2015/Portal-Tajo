import React from 'react';
import pure from 'recompose/pure';
import PowerListContainer from 'containers/PowerList';
import * as ListTypes from 'containers/PowerList/types';

const InstancesColumn = ({
  locations,
  vehicles,
  hooks,
  setUpHooks,
}) => (
  <PowerListContainer
    hooks={hooks}
    setUpHooks={setUpHooks}
  >
    {
      [{
        listType: ListTypes.LIST_VEHICLES,
        items: vehicles,
      }, {
        listType: ListTypes.LIST_LOCATIONS,
        items: locations,
      }]
    }
  </PowerListContainer>
);

InstancesColumn.propTypes = {
  vehicles: React.PropTypes.array.isRequired,
  locations: React.PropTypes.array.isRequired,
  hooks: React.PropTypes.func.isRequired,
  setUpHooks: React.PropTypes.func.isRequired,
};

export default pure(InstancesColumn);
