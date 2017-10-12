//

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
