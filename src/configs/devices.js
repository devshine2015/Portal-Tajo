import uuid from 'node-uuid';

const devices = [{
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
  manufacturer: 'ATrack',
  model: 'GV65 N (2G)',
  name: 'Drvr GV65 N (2G)',
}, {
  manufacturer: 'ATrack',
  model: 'GV300W (UG)',
  name: 'Drvr GV300W (UG)',
}, {
  manufacturer: 'ATrack',
  model: 'Calamp',
  name: 'Drvr Calamp',
}, {
  manufacturer: 'ATrack',
  model: 'Spot Trace (SAT)',
  name: 'Drvr Spot Trace (SAT)',
}, {
  manufacturer: 'ATrack',
  model: 'Spot 3 (SAT)',
  name: 'Drvr Spot 3 (SAT)',
}, {
  manufacturer: 'ATrack',
  model: 'SmartOne B (SAT)',
  name: 'Drvr SmartOne B (SAT)',
}, {
  manufacturer: 'ATrack',
  model: 'SmartOne (SAT)',
  name: 'Drvr SmartOne (SAT)',
}];

devices.forEach(d => {
  d.id = uuid.v4();
});

function getById(id) {
  let result;

  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id === id) {
      result = devices[i];
      break;
    }
  }

  return result;
}

export default {
  list: devices,
  getById,
};
