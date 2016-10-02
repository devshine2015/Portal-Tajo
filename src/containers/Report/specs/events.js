import moment from 'moment';

const prettyTypes = {
  'vehicle-position': 'Position',
  'vehicle-fuel': 'Fuel',
  'vehicle-ign-off': 'Ignition Off',
  'vehicle-ign-on': 'Ignition On',
  'vehicle-1wire-temperature': 'Temperature',
  'vehicle-started-moving': 'Start Moving',
  'vehicle-stopped-moving': 'Stop Moving',
  'vehicle-stop-stats': 'Stop Statistics',
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
    case 'vehicle-fuel': {
      return `Fuel used: ${fuelInfo.totFuelUsed}, Fuel level: ${fuelInfo.fuelLevelPerc}`;
    }
    case 'vehicle-ign-off': {
      return `Ignition on period: ${ignitionOnPeriod}`;
    }
    case 'vehicle-ign-on': {
      return `Ignition off period: ${ignitionOffPeriod}`;
    }
    case 'vehicle-1wire-temperature': {
      return `Temperature: ${tempInfo}`;
    }
    case 'vehicle-started-moving': {
      return `Stoped period: ${stoppedPeriod}`;
    }
    case 'vehicle-stopped-moving': {
      return `Moving period: ${movingPeriod}`;
    }
    case 'vehicle-stop-stats': {
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

  const prettyType = prettyTypes[type] || type;
  const { pos, ts, vehicleId, ...rest } = ev;


  return [
    licensePlate,
    name,
    prettyType,
    moment(pos.posTime).format(dateFormat),
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
