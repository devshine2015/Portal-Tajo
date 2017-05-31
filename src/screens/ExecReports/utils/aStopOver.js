// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';
import { queueReverseGeocode } from 'utils/mapServices/google/geocode';
import * as eventHelpers from './eventHelpers';

function HistoryWayPoint(startSampleIdx, endSampleIdx, startSample, endSample) {
  this.isAStopOver = true;
  this.startIdx = startSampleIdx;
  this.endIdx = endSampleIdx;

  this.startDate = moment(startSample.ev.ts).toDate();
  this.endDate = moment(endSample.ev.ts).toDate();
  this.durationMs = this.endDate.getTime() - this.startDate.getTime();

  this.latLng = eventHelpers.eventPos(startSample);
  this.address = '...looking...';
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

export function makeAStopOver(startSampleIdx, endSampleIdx, eventsFrame, storeUpdateCallback) {
  const startSample = eventsFrame[startSampleIdx];
  const endSample = eventsFrame[endSampleIdx];
//  return new HistoryWayPoint(startSampleIdx, endSampleIdx, startSample, endSample);

  const aStopOver = new HistoryWayPoint(startSampleIdx, endSampleIdx, startSample, endSample);
  queueReverseGeocode(eventHelpers.eventPos(startSample),
    (address) => {
      aStopOver.address = address;
      storeUpdateCallback();
    },
    () => {
      aStopOver.address = status; // 'Address not found';
    },
  );
  return aStopOver;
}
