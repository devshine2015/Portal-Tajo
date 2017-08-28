import moment from 'moment';
import { mwaGetJobsForVehicle } from 'services/MWA/helpers';
import { isJobWithinPeriod } from '../specs/mwaJobsSizes';

// TODO: verify: for MWA reports assuming the report timeFrame is
// from periods[0] to periods[1]
// using this to filter out jobs
export const prepareDataForReport = (
  selectedReports = {}, periods = [], frequency, dateFormat,
) =>
  (reports = {}) => {
    let result = [];
    const selectedTypes = Object.keys(selectedReports);
    const filteredTypesByDomain = {};

    for (let i = 0; i < selectedTypes.length; i++) {
      const domain = selectedReports[selectedTypes[i]].domain;

      if (filteredTypesByDomain[domain]) continue;

      filteredTypesByDomain[domain] = selectedReports[selectedTypes[i]];
    }

    let rowNumber = 0;
    let totalRowsCount = 0;
    let maxRowsCount = 0;

    periods.forEach((momentDate, j, a) => {
      const isLastDate = j === a.length - 1;

      // don't calculate for last period
      // if splitting not defined (frequency == undefined)
      if (!frequency && isLastDate) return;

      const period = {};

      if (!isLastDate) {
        period.start = momentDate;
        period.end = a[j + 1];
      } else {
        period.start = a[j - 1];
        period.end = momentDate;
      }

      Object.entries(reports).forEach(([domain, domainData]) => {
        if (domainData.customReportKind === undefined) {
          const recordsForAllVehicles = domainData;
          if (recordsForAllVehicles.length === 0) return;

          rowNumber = totalRowsCount;

          let filteredTypesToCalc = selectedTypes;

          if (typeof filteredTypesByDomain[domain].filterSimilar === 'function') {
            filteredTypesToCalc = filteredTypesByDomain[domain].filterSimilar(selectedTypes);
          }

          for (let i = 0; i < recordsForAllVehicles.length; i++, rowNumber++) {
            if (!result[rowNumber]) {
              result[rowNumber] = [];
            }
            const column = _calculateColumn({
              filteredTypesToCalc,
              frequency,
              period,
              dateFormat,
              calculate: filteredTypesByDomain[domain].calc,
              record: recordsForAllVehicles[i],
            });

            result[rowNumber] = result[rowNumber].concat(column);
          }

          maxRowsCount = recordsForAllVehicles.length;
        } else if (domainData.customReportKind === 'mwa') {
          // MWA case ---------
          rowNumber = totalRowsCount;

          domainData.vehicles.forEach((aVeh) => {
            if (!result[rowNumber]) {
              result[rowNumber] = [];
            }
            const order = Math.max(0, selectedTypes.indexOf(filteredTypesByDomain[domain].reportType));
            const column = {
              order,
              // value: mwaGetJobsForVehicle(aVeh.id, domainData[0].RESULTS).length,
              value: mwaGetJobsForVehicle(aVeh.id, domainData[0].RESULTS)
                .filter(aJob => isJobWithinPeriod(aJob, periods[0], periods[1])).length,
            };
            result[rowNumber] = result[rowNumber].concat(column);
            rowNumber++;
          });
        }
      });
      const secondPassResult = [];
      // second pass - here we add multiLine per vehicle - depending on jobs count
      Object.entries(reports).forEach(([domain, domainData]) => {
        if (domainData.customReportKind === 'mwaTime') {
            // MWA case ---------
          rowNumber = totalRowsCount;

          domainData.vehicles.forEach((aVeh) => {
            const N_A = 'N/A';
            if (!result[rowNumber]) {
              result[rowNumber] = [];
            }

            const order = Math.max(0, selectedTypes.indexOf(filteredTypesByDomain[domain].reportType));
            const jobs = mwaGetJobsForVehicle(aVeh.id, domainData[0].RESULTS)
              .filter(aJob => aJob.DT_FIELD_END !== null && aJob.DT_JOB_OPEN !== null)
              .filter(aJob => isJobWithinPeriod(aJob, periods[0], periods[1]));

            if (jobs.length === 0) {
              const column = {
                order,
                value: N_A,
              };
              secondPassResult.push(result[rowNumber].concat(column).concat(column).concat(column).concat(column)
                .concat(column)
                .concat(column));
            } else {
              jobs.forEach((aJob) => {
                const startD = moment(aJob.DT_JOB_OPEN);
                const endD = moment(aJob.DT_FIELD_END);
                const columnN = {
                  order,
                  value: aJob.WLMA_JOB_CODE,
                };
                const columnJobStatus = {
                  order,
                  value: aJob.JOB_STATUS_DESC !== null ? aJob.JOB_STATUS_DESC : N_A,
                };
                const columnPipe = {
                  order,
                  value: aJob.PIPE_SIZE_DESC !== null ? aJob.PIPE_SIZE_DESC : N_A,
                };
                const columnT0 = {
                  order,
                  value: startD.toDate().toLocaleString(),
                };
                const columnT1 = {
                  order,
                  value: endD.toDate().toLocaleString(),
                };
                const deltaMs = endD.diff(startD);
              // const deltaMin = Math.floor(deltaMs / 1000 / 60);
                const deltaHvr = Math.floor(deltaMs / 1000 / 60 / 60);
                const columnD = {
                  order,
                  value: `${deltaHvr}${moment.utc(deltaMs).format(':mm')}`,
                };
                secondPassResult.push(result[rowNumber]
                      .concat(columnN)
                      .concat(columnJobStatus)
                      .concat(columnPipe)
                      .concat(columnT0)
                      .concat(columnT1)
                      .concat(columnD));
              });
            }
            ++rowNumber;
          });
        }
      });
      if (secondPassResult.length > result.length) { result = secondPassResult; }
      totalRowsCount += maxRowsCount;
    });
    // sort columns in rows
    // accordingly to order property
    for (let k = 0; k < result.length; k++) {
      const sortedRow = result[k]
                         .sort((x, y) => x.order - y.order)
                         .map(obj => obj.value);

      result[k] = sortedRow;
    }

    return Promise.resolve({ table: result, secondaryTable: _generateSecondaryTable(reports, periods) });
  };

function _generateSecondaryTable(reports, fromToPeriods) {
  let result = [];
  // Object.entries(reports).forEach(([domain, domainData]) => {
  Object.entries(reports).forEach((aReport) => {
    const domainData = aReport[1];
    if (domainData.customReportGenerator !== undefined) {
      result = domainData.customReportGenerator(domainData, fromToPeriods);
    }
  });
  return result;
}

function _calculateColumn({
  filteredTypesToCalc,
  calculate,
  frequency,
  period,
  record,
  dateFormat,
}) {
  let recordsToCalc = record;

  if (record.hasOwnProperty('reportRecords')) {
    recordsToCalc = record.reportRecords;
  }

  return calculate(recordsToCalc, {
    frequency,
    period,
    dateFormat,
    selectedTypes: filteredTypesToCalc,
  });
}
