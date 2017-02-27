import uuid from 'node-uuid';
import R from 'ramda';

const rawDevices = [{
  manufacturer: 'ATrack',
  model: 'AL7 (UG)',
  name: 'Drvr AL7 (UG)',
}, {
  manufacturer: 'ATrack',
  model: 'AK7 (UG)',
  name: 'Drvr AK7 (UG)',
}, {
  manufacturer: 'ATrack',
  model: 'AX7 (UG)',
  name: 'Drvr AX7 (UG)',
}, {
  manufacturer: 'ATrack',
  model: 'AX9 (UG)',
  name: 'Drvr AX9 (UG)',
}, {
  manufacturer: 'ATrack',
  model: 'AS1 (UG)',
  name: 'Drvr AS1 (UG)',
}, {
  manufacturer: 'ATrack',
  model: 'AL1 (2G)',
  name: 'Drvr AL1 (2G)',
}, {
  manufacturer: 'ATrack',
  model: 'AL7 (2G)',
  name: 'Drvr AL7 (2G)',
}, {
  manufacturer: 'ATrack',
  model: 'AX7 (2G)',
  name: 'Drvr AX7 (2G)',
}, {
  manufacturer: 'ATrack',
  model: 'AS1 (2G)',
  name: 'Drvr AS1 (2G)',
}, {
  manufacturer: 'ATrack',
  model: 'AX5 (2G)',
  name: 'Drvr AX5 (2G)',
}, {
  manufacturer: 'Queclink',
  model: 'GV65 N (2G)',
  name: 'Drvr GV65 N (2G)',
}, {
  manufacturer: 'Queclink',
  model: 'GV300W (UG)',
  name: 'Drvr GV300W (UG)',
}, {
  manufacturer: 'Calamp',
  model: 'Calamp',
  name: 'Drvr Calamp',
}, {
  manufacturer: 'Spot Trace',
  model: 'Spot Trace 3030 (SAT)',
  name: 'Drvr Spot Trace 3030 (SAT)',
}, {
  manufacturer: 'GlobalStar',
  model: 'Spot 3 (SAT)',
  name: 'Drvr Spot 3 (SAT)',
}, {
  manufacturer: 'GlobalStar',
  model: 'SmartOne (SAT)',
  name: 'Drvr SmartOne (SAT)',
}, {
  manufacturer: 'GlobalStar',
  model: 'SmartOne B (SAT)',
  name: 'Drvr SmartOne B (SAT)',
}, {
  manufacturer: 'GlobalStar',
  model: 'SmartOne C (SAT)',
  name: 'Drvr SmartOne C (SAT)',
}];

let devices;

const addId = d => R.merge({ id: uuid.v4() }, d);

(() => {
  devices = R.map(addId, rawDevices);
})();

export default devices;

export const getById = id => R.filter(R.propEq('id', id), devices)[0];

