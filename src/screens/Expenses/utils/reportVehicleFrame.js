// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';
import { makeTripsParcer } from './aTrip';
import { makeAStopOver } from './aStopOver';
import { makeATimeStamp } from './aTimeStamp';
import * as eventHelpers from './eventHelpers';
import { haversineDist } from 'utils/mapBoxMap';


const CHRONICLE_LOCAL_INCTANCE_STATE_NONE = 'chronLocStateNone';
const CHRONICLE_LOCAL_INCTANCE_STATE_LOADING = 'chronLocStateLoading';
const CHRONICLE_LOCAL_INCTANCE_STATE_OK_EMPTY = 'chronLocStateOk';
const CHRONICLE_LOCAL_INCTANCE_STATE_OK_DATA = 'chronLocStateData';


function ReportVehicleFrame(dateFrom, dateTo) {
  this.idiling = {
    drivingTime: 0,
    ignOffWhileStopped: 0,
    ignOn: 0,
    ignOnWhileStopped: 0,
    stoppedTime: 0,
  };
  this.distTotal = 0;
  this.distLastTrip = 0;
  this.milageDistance = 0;
  this.calculatedDistanceM = 0;
  this.numberOfPosSamples = 0;
  this.numberOfSamples = 0;

  this.trips = [];
  this.tripsTimeLine = [];

  this.posData = [];

  this.temperatureData = [];
  this.minTemp = 300;
  this.maxTemp = -300;

  this.speedData = [];
  this.maxSpeed = 0;

  this.stopEvents = [];

  this.events = [];
  //
  this.lastFoundIdx = 0;
  this.lastFoundIdxT = { idx: 0, t: 0 };
//    this.indexHint = -1;
  if (dateFrom === undefined) {
    this.state = CHRONICLE_LOCAL_INCTANCE_STATE_NONE;
    return;
  }
  this.dateFrom = dateFrom;
  this.dateFrom00 = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
  this.dateTo = dateTo;
  this.durationMs = this.dateTo.getTime() - this.dateFrom.getTime();

  this.state = CHRONICLE_LOCAL_INCTANCE_STATE_LOADING;
}

//
//-----------------------------------------------------------------------
//
// STATUS checkers here
//
ReportVehicleFrame.prototype.isValid = function () {
  return this.state === CHRONICLE_LOCAL_INCTANCE_STATE_OK_DATA
      || this.state === CHRONICLE_LOCAL_INCTANCE_STATE_OK_EMPTY;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.isLoading = function () {
  return this.state === CHRONICLE_LOCAL_INCTANCE_STATE_LOADING;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.isDummy = function () {
  return this.state === CHRONICLE_LOCAL_INCTANCE_STATE_NONE;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.hasData = function () {
  return this.state === CHRONICLE_LOCAL_INCTANCE_STATE_OK_DATA;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.isEmpty = function () {
  return this.state === CHRONICLE_LOCAL_INCTANCE_STATE_OK_EMPTY;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.isStatic = function () {
// TODO: need more checks here - type of event, etc
  return this.isValid() && this.posData.length === 1;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.getValidTrips = function () {
  return this.trips; // .filter(aTrip => aTrip.isValid());
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.parceData = function (events, storeUpdateCallback) {
  if (events.length < 10) {
    console.log(`history frame for ${this.dateFrom} - ${this.dateTo}`);
    console.log(`  EMPTY ${events.length}`);
    return;
  }
  const t0 = performance.now();
  this.events = events;
  // let prevPosSample = null;
  this.calculatedDistanceM = 0;
  this.totalStoOverDurationMs = 0;
  this.totalTripDurationMs = 0;
  this.numberOfSamples = events.length;

  // const _dbgTime = 0;
  // const dataSize = events.length;

  const tripParcer = makeTripsParcer();

  events.forEach((theSample, idx) => {
    tripParcer.processSample(theSample, idx);
    const eventMomentTS = moment(theSample.ev.ts).valueOf();
    const eventTimeMs = eventMomentTS - this.dateFrom.getTime();
    if (eventHelpers.isPositionEvent(theSample)) {
      this.posData.push({ timeMs: eventTimeMs,
        pos: window.L.latLng(eventHelpers.eventPos(theSample).lat, eventHelpers.eventPos(theSample).lng) });
      this.speedData.push({ timeMs: eventTimeMs, v: eventHelpers.eventSpeed(theSample) });
      this.numberOfPosSamples += 1;
    }
  });

  this.tripsRaw = tripParcer.finalize(events.length - 1);
  this.tripsRaw.forEach(aTrip => aTrip.prepareData(events, this.dateFrom));

  this.trips = this.tripsRaw.filter(aTrip => aTrip.isValid());
  this.trips.forEach(aTrip => aTrip.markSamples(events));

  let prevEndIdx = 0;
  let prevTrip = null;
  this.trips.forEach((aTrip) => {
    aTrip.fromStopOwer = makeAStopOver(prevEndIdx, aTrip.startIdx, events, storeUpdateCallback);
    this.totalStoOverDurationMs += aTrip.fromStopOwer.durationMs;
    this.totalTripDurationMs += aTrip.durationMs;
    if (prevTrip !== null) {
      prevTrip.toStopOver = aTrip.fromStopOwer;
    }
    this.tripsTimeLine.push(makeATimeStamp(moment(events[prevEndIdx].ev.ts).toDate()));
    this.tripsTimeLine.push(aTrip.fromStopOwer);
    this.tripsTimeLine.push(makeATimeStamp(moment(events[aTrip.startIdx].ev.ts).toDate()));
    this.tripsTimeLine.push(aTrip);
    prevEndIdx = aTrip.endIdx;
    prevTrip = aTrip;
  });
  const aFinalStopOver = makeAStopOver(prevEndIdx, events.length - 1, events, storeUpdateCallback);
  this.totalStoOverDurationMs += aFinalStopOver.durationMs;
  if (prevTrip !== null) {
    prevTrip.toStopOver = aFinalStopOver;
  }
  this.tripsTimeLine.push(makeATimeStamp(moment(events[prevEndIdx].ev.ts).toDate()));
  this.tripsTimeLine.push(aFinalStopOver);
  this.tripsTimeLine.push(makeATimeStamp(moment(events[events.length - 1].ev.ts).toDate()));

  // mark the first and the last timestamps
  this.tripsTimeLine[0].isATerminal = true;
  this.tripsTimeLine[this.tripsTimeLine.length - 1].isATerminal = true;

  this.calculatePerDayTotals();

  const t1 = performance.now();
  console.log(`Report generation took ${(t1 - t0)} milliseconds.`);

  this.state = CHRONICLE_LOCAL_INCTANCE_STATE_OK_DATA;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.calculatePerDayTotals = function () {
  this.perDayTotals = [];
  this.grandTotal = {
    calculatedDistanceM: 0,
    calculatedIdleDurationMs: 0,
    calculatedOperationalDurationMs: 0,
    calculatedRestMs: 0,
  };

  let prevPosSample = null;
  let calculatedDistanceM = 0;
  let calculatedIdleDurationMs = 0;
  let calculatedOperationalDurationMs = 0;
  let refDayStartMoment = moment(this.dateFrom);
  let refDayEndMoment = moment(this.dateFrom).startOf('day').add(1, 'days');
  let refTripIdx = -1;

  // TODO: verify - considering only pos samples
  this.events.filter(theSample => eventHelpers.isPositionEvent(theSample) && theSample.myTripIdx !== undefined)
    .forEach((theSample) => {
      let thisRefMoment = moment(theSample.ev.ts);
      const isNextDay = thisRefMoment.isAfter(refDayEndMoment);

      // new/next trip - restart prevPos
      if (theSample.myTripIdx !== refTripIdx) {
        prevPosSample = refTripIdx === -1 ? theSample : null;
        refTripIdx = theSample.myTripIdx;
        return;
      }
      let dayWithNoSamples = false;
      if (isNextDay) {
        thisRefMoment = refDayEndMoment;
        dayWithNoSamples = (prevPosSample !== null) && thisRefMoment.isBefore(moment(prevPosSample.ev.ts));
      }
      this.maxSpeed = Math.max(this.maxSpeed, eventHelpers.eventSpeed(theSample));
      if (prevPosSample !== null && !dayWithNoSamples) {
        const distM = haversineDist(eventHelpers.eventPos(prevPosSample), eventHelpers.eventPos(theSample));
        calculatedDistanceM += distM;
        this.grandTotal.calculatedDistanceM += distM;
        const timeDeltaMs = thisRefMoment.diff(moment(prevPosSample.ev.ts));
        if (eventHelpers.eventSpeed(prevPosSample) === 0) {
          calculatedIdleDurationMs += timeDeltaMs;
          this.grandTotal.calculatedIdleDurationMs += timeDeltaMs;
        } else {
          calculatedOperationalDurationMs += timeDeltaMs;
          this.grandTotal.calculatedOperationalDurationMs += timeDeltaMs;
        }
      }
      prevPosSample = theSample;
      // need to flip to next day?
      if (isNextDay) {
        this.perDayTotals.push({
          dateMoment: refDayStartMoment,
          calculatedDistanceM,
          calculatedIdleDurationMs,
          calculatedOperationalDurationMs,
          calculatedRestMs: ((refDayEndMoment.valueOf() - refDayStartMoment.valueOf())
                    - calculatedOperationalDurationMs
                    - calculatedIdleDurationMs),
        });
        calculatedDistanceM = 0;
        calculatedIdleDurationMs = 0;
        calculatedOperationalDurationMs = 0;
        refDayStartMoment = moment(refDayEndMoment);
        refDayEndMoment = refDayEndMoment.add(1, 'days');
      }
    });
  // add the rest as the last day
  // const refLastMoment = moment(this.dateTo);
  this.perDayTotals.push({
    dateMoment: refDayStartMoment,
    calculatedDistanceM,
    calculatedIdleDurationMs,
    calculatedOperationalDurationMs,
    calculatedRestMs: ((moment(this.dateTo).valueOf() - refDayStartMoment.valueOf())
                  - calculatedOperationalDurationMs
                  - calculatedIdleDurationMs),
  });

  this.grandTotal.calculatedRestMs = this.durationMs - this.grandTotal.calculatedIdleDurationMs
          - this.grandTotal.calculatedOperationalDurationMs;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.calculatePerDayTotals_old = function () {
  this.perDayTotals = [];
  this.grandTotal = {
    calculatedDistanceM: 0,
    calculatedIdleDurationMs: 0,
    calculatedOperationalDurationMs: 0,
    calculatedRestMs: 0,
  };

  let prevPosSample = null;
  let calculatedDistanceM = 0;
  let calculatedIdleDurationMs = 0;
  let calculatedOperationalDurationMs = 0;
  let refDayStartMoment = moment(this.dateFrom);
  let refDayEndMoment = moment(this.dateFrom).startOf('day').add(1, 'days');

  this.events.forEach((theSample) => {
    // TODO: verify - considering only pos samples
    if (eventHelpers.isPositionEvent(theSample)) {
      let thisRefMoment = moment(theSample.ev.ts);
      const isNextDay = thisRefMoment.isAfter(refDayEndMoment);

      if (isNextDay) {
        thisRefMoment = refDayEndMoment;
      }
      this.maxSpeed = Math.max(this.maxSpeed, eventHelpers.eventSpeed(theSample));
      if (prevPosSample !== null) {
        const distM = haversineDist(eventHelpers.eventPos(prevPosSample), eventHelpers.eventPos(theSample));
        calculatedDistanceM += distM;
        this.grandTotal.calculatedDistanceM += distM;
        const timeDeltaMs = thisRefMoment.diff(moment(prevPosSample.ev.ts));
        if (eventHelpers.eventSpeed(prevPosSample) === 0) {
          calculatedIdleDurationMs += timeDeltaMs;
          this.grandTotal.calculatedIdleDurationMs += timeDeltaMs;
        } else {
          calculatedOperationalDurationMs += timeDeltaMs;
          this.grandTotal.calculatedOperationalDurationMs += timeDeltaMs;
        }
      }
      prevPosSample = theSample;
      // need to flip to next day?
      if (isNextDay) {
        this.perDayTotals.push({
          dateMoment: refDayStartMoment,
          calculatedDistanceM,
          calculatedIdleDurationMs,
          calculatedOperationalDurationMs,
          calculatedRestMs: ((refDayEndMoment.valueOf() - refDayStartMoment.valueOf())
                    - calculatedOperationalDurationMs
                    - calculatedIdleDurationMs),
        });
        calculatedDistanceM = 0;
        calculatedIdleDurationMs = 0;
        calculatedOperationalDurationMs = 0;
        refDayStartMoment = moment(refDayEndMoment);
        refDayEndMoment = refDayEndMoment.add(1, 'days');
      }
    }
  });
  // add the rest as the last day
  // const refLastMoment = moment(this.dateTo);
  this.perDayTotals.push({
    dateMoment: refDayStartMoment,
    calculatedDistanceM,
    calculatedIdleDurationMs,
    calculatedOperationalDurationMs,
    calculatedRestMs: ((moment(this.dateTo).valueOf() - refDayStartMoment.valueOf())
                  - calculatedOperationalDurationMs
                  - calculatedIdleDurationMs),
  });

  this.grandTotal.calculatedRestMs = this.durationMs - this.grandTotal.calculatedIdleDurationMs
          - this.grandTotal.calculatedOperationalDurationMs;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.kill = function () {
  // if(this.player!=null)
  //   this.player.kill();
  // this.player = null;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.getDateAtMs = function (timeMs) {
  const aDate = new Date(timeMs + this.dateFrom00.getTime());
  return aDate;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.getPosAtMs = function (timeMs) {
  if (!this.hasPositions()) {
    return null;
  }
  this.lastFoundIdxT = this.findSampleIdxWithT(Math.floor(timeMs), this.posData);
  if (this.lastFoundIdxT.t <= 0) {
    return this.posData[this.lastFoundIdxT.idx].pos;
  }
  // interpolate
  const xx1 = this.posData[this.lastFoundIdxT.idx].pos.lat;
  const yy1 = this.posData[this.lastFoundIdxT.idx].pos.lng;
  const xx2 = this.posData[this.lastFoundIdxT.idx + 1].pos.lat;
  const yy2 = this.posData[this.lastFoundIdxT.idx + 1].pos.lng;
  return { lat: xx1 + (xx2 - xx1) * this.lastFoundIdxT.t,
    lng: yy1 + (yy2 - yy1) * this.lastFoundIdxT.t };
};
//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.getTemperatureAtMs = function (timeMs) {
  const tempSample = this.findSample(Math.floor(timeMs), this.temperatureData);
  return tempSample.t;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.hasTemperature = function () {
  return this.temperatureData.length > 5;
};
//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.hasPositions = function () {
  return this.posData.length > 5;
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.findSample = function (requestMs, data) {
  if (requestMs <= 0) {
    return data[0];
  }
  const dataSz = data.length;
  let dataIdx = Math.min(dataSz - 1, Math.floor(dataSz * requestMs / this.durationMs));
  const stepDir = requestMs < data[dataIdx].timeMs ? -1 : 1;

  for (; dataIdx >= 0 && dataIdx < dataSz - 1; dataIdx += stepDir) {
    if (data[dataIdx].timeMs <= requestMs && data[dataIdx + 1].timeMs > requestMs) {
      this.lastFoundIdx = dataIdx;
    // interpolate here?
      return data[dataIdx];
    }
  }
  return (dataIdx < 0) ? data[0] : data[dataSz - 1];
};

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.findSampleIdxWithT = function (requestMs, data) {
  if (requestMs <= 0) {
    return { idx: 0,
      t: 0 };
  }
  const dataSz = data.length;
  let dataIdx = this.lastFoundIdx; // Math.min(dataSz - 1, Math.floor(dataSz * requestMs / this.durationMs));
  const stepDir = requestMs < data[dataIdx].timeMs ? -1 : 1;

  for (; dataIdx >= 0 && dataIdx < dataSz - 1; dataIdx += stepDir) {
    if (data[dataIdx].timeMs <= requestMs && data[dataIdx + 1].timeMs > requestMs) {
      this.lastFoundIdx = dataIdx;
      // interpolate here?
      const normalizedT = (requestMs - data[dataIdx].timeMs)
          / (data[dataIdx + 1].timeMs - data[dataIdx].timeMs);
      return { idx: dataIdx,
        t: normalizedT };
    }
  }
  return { idx: (dataIdx < 0) ? 0 : dataSz - 1,
    t: 0 };
};


//
//
//-----------------------------------------------------------------------

//
//
//-----------------------------------------------------------------------

export function createReportFrame(dateFrom, dateTo) {
  return new ReportVehicleFrame(dateFrom, dateTo);
}

export function setReportFrameEvents(reportFrame, events, storeUpdateCallback) {
  if (events === null) {
    return;
  }
  reportFrame.parceData(events, storeUpdateCallback);

  // TODO: ? need more checks here - type of event, etc?
  reportFrame.state = reportFrame.hasPositions() || reportFrame.hasTemperature() ?
      CHRONICLE_LOCAL_INCTANCE_STATE_OK_DATA
      : CHRONICLE_LOCAL_INCTANCE_STATE_OK_EMPTY;
}
