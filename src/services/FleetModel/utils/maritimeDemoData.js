// TODO: REMOVE this after we have some real maritime data
// some faked hardcoded data for sheeps/maritime demo
//

import { isMaritime } from 'configs';
const isMaritimeDemoData = true;

export function removeMe_OverrideMaritimeDemoData(status) {
  if (!isMaritime || !isMaritimeDemoData) {
    return;
  }
  // set timestamp back - simulate some time after latest report
  const backTimeOffsetMin = 43;
  const backTimeOffset = 1000 * 60 * backTimeOffsetMin;
  const backDate = new Date(Date.now() - backTimeOffset);
  status.ts = backDate.toISOString();

  if (status.pos === undefined) {
    status.pos = {};
  }
  if (status.pos.latlon === undefined) {
    status.pos.latlon = {};
  }
  status.pos.latlon.lat = 13.6283645;
  status.pos.latlon.lng = 98.2256268;
  // Most containerships are designed to travel at speeds around 24 knots
  // its 44.448 kmH
  status.pos.speed = 24;
}

let maritimeDemoCounter = 0;
// demo helper to set all the proto maritime-specific props to vessel obj
export function removeMe_OverrideMaritimeDemoVessel(imVessel) {
  if (!isMaritime || !isMaritimeDemoData) {
    return imVessel;
  }

  return imVessel.withMutations(s => {
    s.set('kind', 'BOAT')
     .set('trackigInterval', 60) // how often it reports, minutes
     .set('heading', 130);
  });
}
