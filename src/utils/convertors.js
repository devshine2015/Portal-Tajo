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
