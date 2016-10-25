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
  GEOFENCE_ENTER: {
    type: 'vehicle-entered-geofence',
    disabled: false,
  },
  GEOFENCE_LEAVE: {
    type: 'vehicle-left-geofence',
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
  [TYPES.GEOFENCE_ENTER.type]: 'Geofence Entered',
  [TYPES.GEOFENCE_LEAVE.type]: 'Geofence Leaved',
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
  gf,
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
    case TYPES.GEOFENCE_ENTER.type: {
      return `Entered geofence: ${gf.name}`;
    }
    case TYPES.GEOFENCE_LEAVE.type: {
      return `Left geofence: ${gf.name}`;
    }
    default:
      return '';
  }
}

function calcCommonEvents({ ev, type } = {}, {
  dateFormat,
  name,
  licensePlate,
}) {
  const prettyType = prettifiedTypes[type] || type;
  const { pos, ts, vehicleId, ...rest } = ev;

  return [
    licensePlate, // license plate number
    name,         // vehcile name
    prettyType,   // prettified event type
    moment.utc(pos.posTime).format(dateFormat), // event time
    `${pos.latlon.lat}, ${pos.latlon.lng}`,   // event position
    pos.speed.toFixed(2, 10),   // speed
    prettifyAdditionalInfo(type, rest),  // additional info
  ];
}

function calcGeofenceEvents({ ev, type } = {}, {
  dateFormat,
  name,
  licensePlate,
}) {
  const prettyType = prettifiedTypes[type] || type;
  const { crossPos, crossTime, vehicleId, ...rest } = ev;

  return [
    licensePlate, // license plate number
    name,         // vehcile name
    prettyType,   // prettified event type
    moment.utc(crossTime).format(dateFormat), // event time
    `${crossPos.lat}, ${crossPos.lng}`,   // event position
    '', // speed
    prettifyAdditionalInfo(type, rest),  // additional info
  ];
}

const calculateVehicleRow = (event, options, noEvents = false) => {
  // return single row in case of no events
  if (noEvents) {
    return [
      options.licensePlate,
      options.name,
      'no data',
      'no data',
      'no data',
      'no data',
      'no data',
    ];
  }

  switch (event.type) {
    case TYPES.GEOFENCE_LEAVE.type:
    case TYPES.GEOFENCE_ENTER.type:
      return calcGeofenceEvents(event, options);

    default:
      return calcCommonEvents(event, options);
  }
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
}, {
  label: 'Geofence crossing (coming soon)',
  order: 5,
  eventTypes: [TYPES.GEOFENCE_ENTER.type, TYPES.GEOFENCE_LEAVE.type],
  name: 'geofences',
  disabled: true,
}];
