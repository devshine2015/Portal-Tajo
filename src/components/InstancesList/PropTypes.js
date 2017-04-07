import { PropTypes } from 'react';

const shape = PropTypes.shape;
const string = PropTypes.string;

const phrases = {
  speed: 'Speed',
  speed_km_h: 'km/h',
  temperature: 'Temperature',
  device_never_reported: 'never reported - check device',
  remove_success: 'Succesfully removed',
  remove_fail: 'Remove failed',
  radius: 'Radius',
  address: 'Address',
  delete: 'Delete',
  no_history_data: 'no data...',
   mwa_job_carname: '',
};

const _warnings = {
  device_never_reported: string.isRequired,
};

const _vehicleDetailsShape = {
  speed: string.isRequired,
  speed_km_h: string.isRequired,
  temperature: string.isRequired,
};

const _gfDetailsShape = {
  remove_success: string.isRequired,
  remove_fail: string.isRequired,
  radius: string.isRequired,
  address: string.isRequired,
  delete: string.isRequired,
};

const _historyDetailsShape = {
  no_history_data: string.isRequired,
};

export const vehicleDetailsShape = shape(_vehicleDetailsShape);
export const warningsShape = shape(_warnings);
export const gfDetailsShape = shape(_gfDetailsShape);
export const historyDetailsShape = shape(_historyDetailsShape);

export const phrasesShape = shape(
  Object.assign({},
    _vehicleDetailsShape,
    _warnings,
    _gfDetailsShape,
    _historyDetailsShape,
  )
);

export default phrases;
