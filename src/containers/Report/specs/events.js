import moment from 'moment';

const TYPES = {
  POSITION: 'vehicle-position',
  FUEL: 'vehicle-fuel',
  IGNITION_OFF: 'vehicle-ign-off',
  IGNITION_ON: 'vehicle-ign-on',
  TEMPERATURE: 'vehicle-1wire-temperature',
  START_MOVING: 'vehicle-started-moving',
  STOP_MOVING: 'vehicle-stopped-moving',
  STOP_STATS: 'vehicle-stop-stats',
};

const prettifiedTypes = {
  [TYPES.POSITION]: 'Position',
  [TYPES.FUEL]: 'Fuel',
  [TYPES.IGNITION_OFF]: 'Ignition Off',
  [TYPES.IGNITION_ON]: 'Ignition On',
  [TYPES.TEMPERATURE]: 'Temperature',
  [TYPES.START_MOVING]: 'Start Moving',
  [TYPES.STOP_MOVING]: 'Stop Moving',
  [TYPES.STOP_STATS]: 'Stop Statistics',
};

function prettifyAdditionalInfo(type, {
  fuelInfo,
  ignitionOnPeriod,
  ignitionOffPeriod,
  tempInfo,
  stopPeriod,
  stoppedPeriod,
  movingPeriod,
}) {
  switch (type) {
    case TYPES.FUEL: {
      return `Fuel used: ${fuelInfo.totalFuelUsed}, Fuel level: ${fuelInfo.fuelLevelPerc}`;
    }
    case TYPES.IGNITION_OFF: {
      return `Ignition on period: ${ignitionOnPeriod}`;
    }
    case TYPES.IGNITION_ON: {
      return `Ignition off period: ${ignitionOffPeriod}`;
    }
    case TYPES.TEMPERATURE: {
      return `Temperature: ${tempInfo}`;
    }
    case TYPES.START_MOVING: {
      return `Stoped period: ${stoppedPeriod}`;
    }
    case TYPES.STOP_MOVING: {
      return `Moving period: ${movingPeriod}`;
    }
    case TYPES.STOP_STATS: {
      return `Stop period: ${stopPeriod}, Ignition on period: ${ignitionOnPeriod}`;
    }
    default:
      return '';
  }
}

const calculateVehicleRow = ({ ev, type } = {}, {
  dateFormat,
  name,
  licensePlate,
}, empty = false) => {
  // return single row in case of no events
  if (empty) {
    return [
      licensePlate,
      name,
      'no data',
      'no data',
      'no data',
      'no data',
      'no data',
    ];
  }

  const prettyType = prettifiedTypes[type] || type;
  const { pos, ts, vehicleId, ...rest } = ev;

  return [
    licensePlate,
    name,
    prettyType,
    moment.utc(pos.posTime).format(dateFormat),
    `${pos.latlon.lat}, ${pos.latlon.lng}`,
    pos.speed.toFixed(2, 10),
    prettifyAdditionalInfo(type, rest),
  ];
};

const calculateVehicleRows = options => (events = []) => {
  const rows = [];

  if (events.length > 0) {
    events.forEach(event => {
      rows.push(calculateVehicleRow(event, options));
    });
  } else {
    rows.push(calculateVehicleRow({}, options, true));
  }

  return rows;
};

export default calculateVehicleRows;

export const fields = [{
  label: prettifiedTypes[TYPES.POSITION],
  order: 0,
  eventTypes: [TYPES.POSITION],
  name: TYPES.POSITION,
}, {
  label: 'Ignition On/Off',
  order: 1,
  eventTypes: [TYPES.IGNITION_ON, TYPES.IGNITION_OFF],
  name: 'ignition',
}, {
  label: prettifiedTypes[TYPES.FUEL],
  order: 2,
  eventTypes: [TYPES.FUEL],
  name: TYPES.FUEL,
}, {
  label: prettifiedTypes[TYPES.TEMPERATURE],
  order: 3,
  eventTypes: [TYPES.TEMPERATURE],
  name: TYPES.TEMPERATURE,
}, {
  label: 'Start/Stop Moving',
  order: 4,
  eventTypes: [TYPES.STOP_MOVING, TYPES.START_MOVING, TYPES.STOP_STATS],
  name: 'moving',
}];
