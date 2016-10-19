import moment from 'moment';

const TYPES = {
  POSITION: {
    type: 'vehicle-position',
    disabled: false,
  },
  FUEL: {
    type: 'vehicle-fuel',
    disabled: true,
  },
  IGNITION_OFF: {
    type: 'vehicle-ign-off',
    disabled: false,
  },
  IGNITION_ON: {
    type: 'vehicle-ign-on',
    disabled: false,
  },
  TEMPERATURE: {
    type: 'vehicle-1wire-temperature',
    disabled: false,
  },
  START_MOVING: {
    type: 'vehicle-started-moving',
    disabled: false,
  },
  STOP_MOVING: {
    type: 'vehicle-stopped-moving',
    disabled: false,
  },
  STOP_STATS: {
    type: 'vehicle-stop-stats',
    disabled: false,
  },
};

const prettifiedTypes = {
  [TYPES.POSITION.type]: 'Position',
  [TYPES.FUEL.type]: 'Fuel',
  [TYPES.IGNITION_OFF.type]: 'Ignition Off',
  [TYPES.IGNITION_ON.type]: 'Ignition On',
  [TYPES.TEMPERATURE.type]: 'Temperature',
  [TYPES.START_MOVING.type]: 'Start Moving',
  [TYPES.STOP_MOVING.type]: 'Stop Moving',
  [TYPES.STOP_STATS.type]: 'Stop Statistics',
};

const disabledTypes = Object.keys(TYPES)
                      .filter(key => TYPES[key].disabled)
                      .map(key => TYPES[key].type);

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
    case TYPES.FUEL.type: {
      return `Fuel used: ${fuelInfo.totalFuelUsed}, Fuel level: ${fuelInfo.fuelLevelPerc}`;
    }
    case TYPES.IGNITION_OFF.type: {
      return `Ignition on period: ${ignitionOnPeriod}`;
    }
    case TYPES.IGNITION_ON.type: {
      return `Ignition off period: ${ignitionOffPeriod}`;
    }
    case TYPES.TEMPERATURE.type: {
      return `Temperature: ${tempInfo}`;
    }
    case TYPES.START_MOVING.type: {
      return `Stoped period: ${stoppedPeriod}`;
    }
    case TYPES.STOP_MOVING.type: {
      return `Moving period: ${movingPeriod}`;
    }
    case TYPES.STOP_STATS.type: {
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
}, noEvents = false) => {
  // return single row in case of no events
  if (noEvents) {
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
      // filter events only if user selected some
      if (disabledTypes.indexOf(event.type) !== -1 ||
          !!options.selectedEvents &&
          options.selectedEvents.length > 0 &&
          options.selectedEvents.indexOf(event.type) === -1) return;

      rows.push(calculateVehicleRow(event, options));
    });
  } else {
    rows.push(calculateVehicleRow({}, options, !events.length));
  }

  return rows;
};

export default calculateVehicleRows;

export const fields = [{
  label: prettifiedTypes[TYPES.POSITION.type],
  order: 0,
  eventTypes: [TYPES.POSITION.type],
  name: TYPES.POSITION.type,
  disabled: false,
}, {
  label: 'Ignition On/Off',
  order: 1,
  eventTypes: [TYPES.IGNITION_ON.type, TYPES.IGNITION_OFF.type],
  name: 'ignition',
  disabled: false,
}, {
  label: prettifiedTypes[TYPES.TEMPERATURE.type],
  order: 2,
  eventTypes: [TYPES.TEMPERATURE.type],
  name: TYPES.TEMPERATURE.type,
  disabled: false,
}, {
  label: 'Start/Stop Moving',
  order: 3,
  eventTypes: [TYPES.STOP_MOVING.type, TYPES.START_MOVING.type, TYPES.STOP_STATS.type],
  name: 'moving',
  disabled: false,
}, {
  label: `${prettifiedTypes[TYPES.FUEL.type]} (coming soon)`,
  order: 4,
  eventTypes: [TYPES.FUEL.type],
  name: TYPES.FUEL.type,
  disabled: true,
}];
