// jobs number per pipe size
import { mwaGetJobsForVehicle } from 'services/MWA/actions';

const fields = [{
  endpoint: 'mwaS_N',
  customReportKind: 'mwaSizeNbr',
  domain: 'JobsPerSize',
  checkedByDefault: false,
  multiLabel: ['name', 'job_pipe', 'mwa_jobs_nbr'],
  name: 'mwa_jobs_pipe_count',
  reportType: 'mwaSizeNbr',
  order: 9,
  isSecondary: true,
  customReportGenerator: (domainData) => {
    const result = [];
    let rowNumber = 0;
    const totalRowsCount = 0;
    // const maxRowsCount = 0;

    rowNumber = totalRowsCount;
    domainData.vehicles.forEach((aVeh) => {
      const myJobs = mwaGetJobsForVehicle(aVeh.id, domainData[0].RESULTS);
      const pipesCount = {};
      myJobs.forEach((aJob) => {
        const pipeSizeKey = aJob.PIPE_SIZE_DESC !== null ? aJob.PIPE_SIZE_DESC : 'undefined';
        if (pipesCount[pipeSizeKey] === undefined) {
          pipesCount[pipeSizeKey] = 1;
        } else {
          ++pipesCount[pipeSizeKey];
        }
      });
      const columnN = {
        order: 0,
        value: aVeh.original.name,
      };

      Object.entries(pipesCount).forEach(([pipeKey, pipeCount]) => {
        const columnPipe = {
          order: 1,
          value: pipeKey,
        };
        const columnCount = {
          order: 2,
          value: pipeCount.toString(),
        };
        if (!result[rowNumber]) {
          result[rowNumber] = [];
        }
        result[rowNumber] = result[rowNumber].concat(columnN).concat(columnPipe).concat(columnCount);
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

export default fields;
