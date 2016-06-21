function periodForReport({ fromTs, toTs } = {}, isOneDay = false) {
  const toPlusTs = _generateToDate(fromTs, toTs, isOneDay);
  const dt = (toPlusTs - fromTs) / (1000 * 60 * 60 * 24);
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInMilliseconds = 1000 * 60 * offsetInMinutes;
  let daysCount;

  if (dt < 1) {
    daysCount = 1;
  } else {
    daysCount = parseInt(dt, 10) + 1;
  }

  const toFormatted = _formateDate(toPlusTs, offsetInMilliseconds);
  const fromFormatted = _formateDate(fromTs);

  return {
    daysCount,
    periodQueryString: `from=${fromFormatted}&to=${toFormatted}&tzoffset=${0}`,
  };
}

// Just formatting to ISO string. Keep actual date and time values
function _formateDate(dateTs, offsetInMilliseconds = 0) {
  const dateISO = new Date(dateTs - offsetInMilliseconds).toISOString();

  return `${dateISO.slice(0, -1)}+0000`;
}

function _generateToDate(fromTs, toTs, isOneDay = false) {
  let result;

  if (isOneDay) {
    result = new Date(fromTs);
    result.setHours(23);
    result.setMinutes(59);
    result.setSeconds(59);
  } else {
    // add one second to count day amount
    result = new Date(toTs);
    result.setSeconds(1);
  }

  return result.getTime();
}

export default periodForReport;
