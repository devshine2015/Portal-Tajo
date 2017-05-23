// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';
import { queueReverseGeocode } from 'utils/mapServices/google/geocode';
import { haversineDist } from 'utils/mapBoxMap';
import * as eventHelpers from './eventHelpers';

function HistoryWayPoint(startSampleIdx, endSampleIdx, startSample, endSample) {
  this.isAStopOver = true;
  this.startIdx = startSampleIdx;
  this.endIdx = endSampleIdx;

  this.startDate = moment(startSample.ev.ts).toDate();
  this.endDate = moment(endSample.ev.ts).toDate();
  this.durationMs = this.endDate.getTime() - this.startDate.getTime();

  this.latLng = eventHelpers.eventPos(startSample);
  this.address = 'South Okkalapa, Yangon, Myanmar (Burma)'; //  'looking...';
}

//
//-----------------------------------------------------------------------
//
//
HistoryWayPoint.prototype.isValid = function () {
  return true;
};

//
//
//-----------------------------------------------------------------------

export function makeAWayPoint(startSampleIdx, endSampleIdx, eventsFrame) {
  const startSample = eventsFrame[startSampleIdx];
  const endSample = eventsFrame[endSampleIdx];
  return new HistoryWayPoint(startSampleIdx, endSampleIdx, startSample, endSample);
}

export function makeAWayPointFroTripStart(aTrip) {
  // const startSample = eventsFrame[this.startIdx];
  // const endSample = eventsFrame[this.endIdx];
  // return new HistoryStop(startSampleIdx, endSampleIdx, startSample, endSample);
}
