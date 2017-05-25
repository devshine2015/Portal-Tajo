// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';
import { queueReverseGeocode } from 'utils/mapServices/google/geocode';
import { haversineDist } from 'utils/mapBoxMap';
import * as eventHelpers from './eventHelpers';

function HistoryTrip(startSampleIdx, endSampleIdx) {
  this.startIdx = startSampleIdx;
  this.endIdx = endSampleIdx;

  this.startDate = null;
  this.endDate = null;
  this.durationMs = 0;
  this.calculatedDistanceM = 0;
  this.maxSpeed = 0;
  this.avrgSpeed = 0;
  this.numberOfSamples = 0;
  this.numberOfPosSamples = 0;

  this.fromStopOwer = null;
  this.toStopOwer = null;
  // this.startAddress = 'North Dagon Twp, Yangon, Myanmar (Burma)';// 'looking...';
  // this.endAddress = 'South Okkalapa, Yangon, Myanmar (Burma)';// 'looking...';
}

//
//-----------------------------------------------------------------------
//
// STATUS checkers here
//
HistoryTrip.prototype.isValid = function () {
  // disregard "empty" trips
  const isEmpty = this.maxSpeed === 0
    || this.calculatedDistanceM === 0
    || this.numberOfPosSamples < 5;
  return !isEmpty;
  // return this.durationMs > 5 * 1000 * 60;
};

//
//
//-----------------------------------------------------------------------
HistoryTrip.prototype.prepareData = function (eventsFrame, storeUpdateCallback) {
  const startSample = eventsFrame[this.startIdx];
  const endSample = eventsFrame[this.endIdx];

  this.startDate = moment(startSample.ev.ts).toDate();
  this.endDate = moment(endSample.ev.ts).toDate();
  this.durationMs = this.endDate.getTime() - this.startDate.getTime();

  let prevPosSample = null;
  for (let idx = this.startIdx; idx < this.endIdx; idx += 1) {
    const theSample = eventsFrame[idx];
    this.numberOfSamples += 1;
    if (eventHelpers.isPositionEvent(theSample)) {
      this.numberOfPosSamples += 1;
      this.maxSpeed = Math.max(this.maxSpeed, eventHelpers.eventSpeed(theSample));
      if (prevPosSample !== null) {
        this.calculatedDistanceM += haversineDist(eventHelpers.eventPos(prevPosSample), eventHelpers.eventPos(theSample));
      }
      prevPosSample = theSample;
    }
  }
};

//
//
//-----------------------------------------------------------------------

const isTripStart = theSample => theSample.type === 'vehicle-ign-on';
const isTripEnd = theSample => theSample.type === 'vehicle-ign-off';
// const isTripStart = theSample => theSample.type === 'device-ign-on';
// const isTripEnd = theSample => theSample.type === 'device-ign-off';

export function makeTripsParcer() {
  const trips = [];
  let tripStartSampleIdx = -1;

  const processor = (theSample, idx) => {
    if (theSample === undefined) {
      return trips;
    }
    // let dbg = null;
    // if(theSample.type !== 'vehicle-position'
    // && theSample.type !== 'vehicle-fuel'
    // && theSample.type !== 'device-1wire-temperature') {
    //   dbg = theSample;
    // }

    if (tripStartSampleIdx !== -1) {
      if (isTripEnd(theSample)) {
        trips.push(new HistoryTrip(tripStartSampleIdx, idx));
        tripStartSampleIdx = -1;
      }
    } else if (isTripStart(theSample)) {
      tripStartSampleIdx = idx;
    }
    return trips;
  };
  return processor;
}
