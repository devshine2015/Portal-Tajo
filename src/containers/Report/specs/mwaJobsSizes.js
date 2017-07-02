// jobs number per pipe size
import moment from 'moment';
import { mwaGetJobsForVehicle } from 'services/MWA/actions';
import { msToTimeIntervalString } from 'utils/convertors';

const fields = [{
  endpoint: 'mwaS_N',
  customReportKind: 'mwaSizeNbr',
  domain: 'JobsPerSize',
  checkedByDefault: false,
  multiLabel: ['name', 'job_pipe', 'mwa_jobs_nbr', 'job_duration'],
  name: 'mwa_jobs_pipe_count',
  reportType: 'mwaSizeNbr',
  order: 9,
  isSecondary: true,
  customReportGenerator: (domainData, fromTo) => {
    const result = [];
    let rowNumber = 0;
    const totalRowsCount = 0;
    // const maxRowsCount = 0;

    rowNumber = totalRowsCount;
    domainData.vehicles.forEach((aVeh) => {
      const myJobs = mwaGetJobsForVehicle(aVeh.id, domainData[0].RESULTS);
      const pipesCountTimes = {};
      myJobs.forEach((aJob) => {
        if (isJobWithinPeriod(aJob, fromTo[0], fromTo[1])) {
          const pipeSizeKey = aJob.PIPE_SIZE_DESC !== null ? aJob.PIPE_SIZE_DESC : 'undefined';
          if (pipesCountTimes[pipeSizeKey] === undefined) {
            pipesCountTimes[pipeSizeKey] = { count: 1, time: aJobFieldDuration(aJob, fromTo) };
          } else {
            ++pipesCountTimes[pipeSizeKey].count;
            pipesCountTimes[pipeSizeKey].time += aJobFieldDuration(aJob, fromTo);
          }
        }
      });
      const columnN = {
        order: 0,
        value: aVeh.original.name,
      };

      Object.entries(pipesCountTimes).forEach(([pipeKey, pipeCountTime]) => {
        const columnPipe = {
          order: 1,
          value: pipeKey,
        };
        const columnCount = {
          order: 2,
          value: pipeCountTime.count.toString(),
        };
        const columnDuration = {
          order: 2,
          value: msToTimeIntervalString(pipeCountTime.time),
        };
        if (!result[rowNumber]) {
          result[rowNumber] = [];
        }
        result[rowNumber] = result[rowNumber].concat(columnN)
          .concat(columnPipe).concat(columnCount).concat(columnDuration);
        ++rowNumber;
      });
    });
    // sort columns in rows
    // accordingly to order property
    for (let k = 0; k < result.length; k++) {
      const sortedRow = result[k]
                         .sort((x, y) => x.order - y.order)
                         .map(obj => obj.value);

      result[k] = sortedRow;
    }
    return result;
  },
}];

export function isJobWithinPeriod(aJob, momentFrom, momentTo) {
  if (aJob.DT_JOB_CLOSE === null || aJob.DT_JOB_OPEN === null) {
    return false;
  }
  const outOfRange = moment(aJob.DT_JOB_CLOSE).isBefore(momentFrom) || moment(aJob.DT_JOB_OPEN).isAfter(momentTo);
  return !outOfRange;
}
// function aJobDuration(aJob) {
//   if (aJob.DT_JOB_CLOSE === null || aJob.DT_JOB_OPEN === null) {
//     return 0;
//   }
//   return moment(aJob.DT_JOB_CLOSE).diff(moment(aJob.DT_JOB_OPEN));
// }
function aJobFieldDuration(aJob, fromTo) {
  if (aJob.DT_FIELD_BEGIN === null || aJob.DT_FIELD_END === null) {
    return 0;
  }
  let countFrom = moment(aJob.DT_FIELD_BEGIN);
  let countTo = moment(aJob.DT_FIELD_END);
  if (countFrom.isBefore(fromTo[0])) {
    countFrom = fromTo[0];
  }
  if (countTo.isAfter(fromTo[1])) {
    countTo = fromTo[1];
  }
  return countTo.diff(countFrom);
}

export default fields;
