// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';

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

  this.posData = [];

  this.temperatureData = [];
  this.minTemp = 300;
  this.maxTemp = -300;

  this.speedData = [];
  this.maxSpeed = 0;

  this.stopEvents = [];

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
  this.timeRangeMs = dateTo.getTime() - dateFrom.getTime(); // 24*60*60*1000

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

const isPositionEvent = evnt => evnt.type === 'vehicle-position';

const eventPos = evnt => evnt.ev.pos.latlon;

// const latLngEucledDistance = (latLngA, latLngB) => {
//   const dLat = latLngA.lat - latLngB.lat;
//   const dLng = latLngA.lng - latLngB.lng;
//   return Math.sqrt((dLat * dLat) + (dLng * dLng));
// };

// some theory here:
// http://stackoverflow.com/questions/639695/how-to-convert-latitude-or-longitude-to-meters
// http://www.movable-type.co.uk/scripts/latlong.html
function haversineDist(latLngA, latLngB) {  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const piDeg = Math.PI / 180;
  const dLat = (latLngB.lat - latLngA.lat) * piDeg;
  const dLon = (latLngB.lng - latLngA.lng) * piDeg;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latLngA.lat * piDeg) * Math.cos(latLngB.lat * piDeg) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
}

// // safe-checking
// const eventHasPos = evnt => evnt.hasOwnProperty('ev') && evnt.ev.hasOwnProperty('pos');

//
//
//-----------------------------------------------------------------------
ReportVehicleFrame.prototype.parceData = function (events) {
  if (events.length < 10) {
    console.log(`history frame for ${this.dateFrom} - ${this.dateTo}`);
    console.log(`  EMPTY ${events.length}`);
    return;
  }

  let prevPosSample = null;
  this.calculatedDistanceM = 0;

  // const _dbgTime = 0;
  // const dataSize = events.length;

  events.forEach((theSample) => {
    const eventMomentTS = moment(theSample.ev.ts).valueOf();
    const eventTimeMs = eventMomentTS - this.dateFrom.getTime();
    if (isPositionEvent(theSample)) {
      this.posData.push({ timeMs: eventTimeMs,
        pos: window.L.latLng(eventPos(theSample).lat, eventPos(theSample).lng) });
      this.speedData.push({ timeMs: eventTimeMs, v: theSample.ev.pos.speed });
      this.numberOfPosSamples += 1;
      if (prevPosSample !== null) {
        this.calculatedDistanceM += haversineDist(eventPos(prevPosSample), eventPos(theSample));
      }
      prevPosSample = theSample;
    }
  });

  // for (let i = 0; i < dataSize; ++i) {
  //   const theEvent = events[i];
  //   // const eventDate = new Date(theEvent.ev.ts);
  //   const eventMomentTS = moment(theEvent.ev.ts).valueOf();
  //   const eventTimeMs = eventMomentTS - this.dateFrom.getTime();
  //   _dbgTime = eventTimeMs;
  //   switch (theEvent.type) {
  //     case 'vehicle-position':
  //       this.posData.push({ timeMs: eventTimeMs,
  //         pos: window.L.latLng(theEvent.ev.pos.latlon.lat, theEvent.ev.pos.latlon.lng) });
  //       this.speedData.push({ timeMs: eventTimeMs, v: theEvent.ev.pos.speed });
  //       this.maxSpeed = Math.max(this.maxSpeed, theEvent.ev.pos.speed);
  //       break;
  //     case 'vehicle-1wire-temperature':
  //       if (theEvent.ev.tempInfo != null && !isNaN(theEvent.ev.tempInfo)) {
  //         this.temperatureData.push({ timeMs: eventTimeMs, t: theEvent.ev.tempInfo });
  //         this.maxTemp = Math.max(this.maxTemp, theEvent.ev.tempInfo);
  //         this.minTemp = Math.min(this.minTemp, theEvent.ev.tempInfo);
  //       }
  //       break;
  //     case 'vehicle-stop-stats': {
  //       // skip too short stops on the history
  //       const stopMinutes = theEvent.ev.stopPeriod / (1000 * 60);
  //       if (stopMinutes < 2) {
  //         continue;
  //       }
  //       this.stopEvents.push({ timeMs: eventTimeMs,
  //         date: new Date(eventMomentTS),
  //         pos: window.L.latLng(theEvent.ev.pos.latlon.lat, theEvent.ev.pos.latlon.lng),
  //         period: theEvent.ev.stopPeriod,
  //         dateStr: theEvent.ev.pos.posTime });
  //       break;
  //     }
  //   }
  // }

  // if (this.posData.length > 0) {
  //   const firstSample = this.posData[0];
  //   this.posData.splice(0, 0, { timeMs: 0,
  //     pos: firstSample.pos });
  //   this.speedData.splice(0, 0, { timeMs: 0, v: 0 });

  //   const lastSample = this.posData[this.posData.length - 1];
  //   this.posData.push({ timeMs: lastSample.timeMs + 1,
  //     pos: lastSample.pos });
  //   this.speedData.push({ timeMs: lastSample.timeMs + 1, v: 0 });
  // }
  // console.log('history frame for ' + this.dateFrom + ' - ' + this.dateTo);
  // console.log(' dataTimeRangeMs ' + _dbgTime + ' of ' + this.timeRangeMs);
  // console.log('  history frame total: ' + dataSize + ' pos: ' + this.posData.length + ' temp: ' + this.temperatureData.length);
  // console.log('  -- stops: ' + this.stopEvents.length);
  // console.log(' temp range ' + this.minTemp + ' .. ' + this.maxTemp);
  // console.log(' maxSpeed ' + this.maxSpeed);
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
  let dataIdx = Math.min(dataSz - 1, Math.floor(dataSz * requestMs / this.timeRangeMs));
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
  let dataIdx = this.lastFoundIdx; // Math.min(dataSz - 1, Math.floor(dataSz * requestMs / this.timeRangeMs));
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

export function setReportFrameEvents(reportFrame, events) {
  if (events === null) {
    return;
  }
  reportFrame.parceData(events);

  // TODO: ? need more checks here - type of event, etc?
  reportFrame.state = reportFrame.hasPositions() || reportFrame.hasTemperature() ?
      CHRONICLE_LOCAL_INCTANCE_STATE_OK_DATA
      : CHRONICLE_LOCAL_INCTANCE_STATE_OK_EMPTY;
}
