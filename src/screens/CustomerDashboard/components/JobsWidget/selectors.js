import { createSelector } from 'reselect';
import { getVehiclesEx } from 'services/FleetModel/reducers/vehiclesReducer';

const takeNames = (vehicles) => {
  const res = {};

  vehicles.forEach((v) => {
    res[v.id] = v.original.name;
  });

  return res;
};

export default function makeGetVehiclesNames() {
  return createSelector(getVehiclesEx, takeNames);
}
