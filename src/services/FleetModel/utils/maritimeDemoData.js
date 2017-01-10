// TODO: REMOVE this after we have some real maritime data
// some faked hardcoded data for sheeps/maritime demo
//

import { isMaritime, isMaritimeDemoData } from 'configs';

export function overrideMaritimeDemoData(status) {
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
  status.pos.latlon.lat = 16.422532;
  status.pos.latlon.lng = 96.464976;
  // Most containerships are designed to travel at speeds around 24 knots
  // its 44.448 kmH
  status.pos.speed = 24;
}

// demo helper to set all the proto maritime-specific props to vessel obj
export function overrideMaritimeDemoVessel(vessel) {
  if (!isMaritime || !isMaritimeDemoData) {
    return;
  }
  vessel.kind = 'BOAT';
  vessel.trackigInterval = 60; // how often it reports, minutes
  vessel.heading = 130;
}
