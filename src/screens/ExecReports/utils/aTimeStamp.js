// TODO: huge room for optimizations here - locating samaples for time, etc..
//
import moment from 'moment';
import * as eventHelpers from './eventHelpers';

function HistoryTimeStamp(date) {
  this.isATimeStamp = true;
  this.date = date;
}


//
//
//-----------------------------------------------------------------------

export function makeATimeStamp(date) {
  return new HistoryTimeStamp(date);
}
