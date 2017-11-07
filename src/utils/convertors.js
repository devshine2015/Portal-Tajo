//---------------------------------------------------------------------------
// converting speed kmH to knots
// 1 knot is 1.852 kilometres per hour
export function speedKmHToKnots(speedKmH) {
  return speedKmH / 1.852;
}
//
export function nauticalMilesToKm(nmi) {
  return nmi * 1.852;
}
export function kmToNauticalMiles(km) {
  return km / 1.852;
}
// convert decimal degrees to DegriesMinutesSeconds
// example: 16°25'21.1"N 96°27'53.9"E
// Decimal Degrees = Degrees + minutes/60 + seconds/3600
export function decimalDegToDMS(decDeg, isLng) {
  const dir = decDeg < 0 ? (isLng ? 'W' : 'S') : (isLng ? 'E' : 'N');
  const deg = decDeg < 0 ? -decDeg : decDeg;
  const d = Math.floor(deg);
  const minfloat = (deg - d) * 60;
  const m = Math.floor(minfloat);
  const secfloat = (minfloat - m) * 60;
  return `${d}\xB0${m}\'${secfloat.toFixed(2)}"${dir}`;
}

// TODO move to separate file?
// varouse output helpers
export function metersToKmString(meters) {
  return `${Math.round(meters / 100) / 10} km`;
}

export function speedToString(speedKmH) {
  return `${speedKmH.toFixed(1)} km/h`;
}

export function msToTimeIntervalString(duration) {
  // const milliseconds = parseInt((duration % 1000) / 100, 10);
  const secondsInt = (duration / 1000) % 60;
  const minuttesInt = ((duration / (1000 * 60)) % 60)
          + (secondsInt > 30 ? 1 : 0);
  const minutes = parseInt(minuttesInt, 10);
  // const hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
  const hours = parseInt((duration / (1000 * 60 * 60)), 10);

  // const d = moment.duration(v, 'seconds');
  // const s = d.get('seconds');

  // const m = d.get('minutes') + ((s > 30) ? 1 : 0);
  // const h = d.get('hours');

  if (hours < 1) {
    return `${minutes} min`; // + ":" + seconds + "." + milliseconds;
  }
  return `${hours}h ${minutes}m`;
}

export function dateToHHMM(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${date.toLocaleDateString()} ${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
}

export function temperatureToString(temp) {
  return `${temp.toFixed(1)}${String.fromCharCode(176)}C`;
}

export function fuelToString(fuelNormalized, fuelCapacity) {
  if (!fuelNormalized) {
    return false;
  }
  const fuelPerc = `${(fuelNormalized * 100).toFixed(0)}%`;
  if (fuelCapacity !== null && fuelCapacity > 0) {
    return `${(fuelNormalized * fuelCapacity).toFixed(0)}ltr (${fuelPerc})`;
  }
  return fuelPerc;
}
