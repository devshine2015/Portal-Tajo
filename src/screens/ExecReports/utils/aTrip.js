// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';
import { haversineDist } from 'utils/mapBoxMap';
import * as eventHelpers from './eventHelpers';

let tripCountIdx = 0;

function HistoryTrip(startSampleIdx, endSampleIdx) {
  this.startIdx = startSampleIdx;
  this.endIdx = endSampleIdx;

  this.startDate = null;
  this.endDate = null;
  this.durationTotalMs = 0;
  this.calculatedOperationalDurationMs = 0;
  this.calculatedIdleDurationMs = 0;
  this.calculatedDistanceM = 0;
  this.maxSpeed = 0;
  this.avgSpeed = 0;

  this.minTemp = 500;
  this.maxTemp = -500;
  this.avrTemp = undefined;

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
    || this.numberOfPosSamples < 5
    || this.durationTotalMs < 1000 * 60 * 3;
  return !isEmpty;
  // return this.durationMs > 5 * 1000 * 60;
};

//
//-----------------------------------------------------------------------
//
HistoryTrip.prototype.hasTemperature = function () {
  return this.avrTemp !== undefined;
  // return this.durationMs > 5 * 1000 * 60;
};


//
//
//-----------------------------------------------------------------------
HistoryTrip.prototype.prepareData = function (eventsFrame) {
  const startSample = eventsFrame[this.startIdx];
  const endSample = eventsFrame[this.endIdx];

  this.startDate = moment(startSample.ev.ts).toDate();
  this.endDate = moment(endSample.ev.ts).toDate();
  this.durationTotalMs = this.endDate.getTime() - this.startDate.getTime();

  let prevPosSample = null;

  for (let idx = this.startIdx; idx < this.endIdx; idx += 1) {
    const theSample = eventsFrame[idx];
    this.numberOfSamples += 1;
    if (eventHelpers.isPositionEvent(theSample)) {
      this.numberOfPosSamples += 1;
      this.maxSpeed = Math.max(this.maxSpeed, eventHelpers.eventSpeed(theSample));
      if (prevPosSample !== null) {
        this.calculatedDistanceM += haversineDist(eventHelpers.eventPos(prevPosSample), eventHelpers.eventPos(theSample));

        if (eventHelpers.eventSpeed(prevPosSample) === 0) {
          this.calculatedIdleDurationMs += moment(theSample.ev.ts).diff(moment(prevPosSample.ev.ts));
        }
      }
      prevPosSample = theSample;
    }
    if (eventHelpers.isTemperatureEvent(theSample)) {
      const tempValue = eventHelpers.eventTemp(theSample);
      this.maxTemp = Math.max(this.maxTemp, tempValue);
      this.minTemp = Math.min(this.minTemp, tempValue);
    }
  }
  this.calculatedOperationalDurationMs = this.durationTotalMs - this.calculatedIdleDurationMs;
  // calculate avrage speed if operated at least one minute
  this.avgSpeed = this.calculatedOperationalDurationMs > 1000 * 60
    ? (this.calculatedDistanceM / 1000) / (this.calculatedOperationalDurationMs / 1000 / 60 / 60)
    : 0;
  if (this.minTemp <= this.maxTemp) {
    this.avrTemp = (this.minTemp + this.maxTemp) / 2;
  }
};

//
//
//-----------------------------------------------------------------------
HistoryTrip.prototype.markSamples = function (eventsFrame) {
  ++tripCountIdx; // eslint-disable-line
  for (let idx = this.startIdx; idx < this.endIdx; idx += 1) {
    eventsFrame[idx].myTripIdx = tripCountIdx;
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
  let tripStartSampleIdx = 0; // this should take care of a trip which started before the hisotry first sample

  const processSample = (theSample, idx) => {
    if (tripStartSampleIdx !== -1) {
      if (isTripEnd(theSample)) {
        trips.push(new HistoryTrip(tripStartSampleIdx, idx));
        tripStartSampleIdx = -1;
      }
    } else if (isTripStart(theSample)) {
      tripStartSampleIdx = idx;
    }
  };
  const finalize = (lastIdx) => {
    if (tripStartSampleIdx !== -1) {
      trips.push(new HistoryTrip(tripStartSampleIdx, lastIdx));
    }
    return trips;
  };
  return { processSample, finalize };
}
