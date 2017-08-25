import { createSelector } from 'reselect';
import {
  getIsReady,
  getVehiclesEx,
} from './reducers/vehiclesReducer';

export const makeGetFleetIsReady = () => {
  return createSelector(getIsReady, (isReady) => {
    return isReady;
  });
};

const takeNames = (vehicles) => {
  const res = {};

  vehicles.forEach((v) => {
    res[v.id] = v.original.name;
  });

  return res;
};

export const makeGetVehiclesNames = () => {
  return createSelector(getVehiclesEx, takeNames);
};
