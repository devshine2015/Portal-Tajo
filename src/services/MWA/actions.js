import moment from 'moment';
import { onStage, onDev } from 'configs';
import { getProcessedVehicles } from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import { filterProcessedListByName } from 'services/FleetModel/utils/filtering';
import { chronicleMWAJobs } from 'screens/Chronicle/actions';
import { getMWAJobsAsIM } from './reducer';
import fetchJobsCall from './helpers';

export const MWA_ADD_JOBS = 'mwa/add';
export const MWA_SELECT_JOB = 'mwa/slct';

export const mwaFilterJobs = searchString => (dispatch, getState) =>
  _filterMWA({ searchString }, dispatch, getState);

export const mwaSelectJob = id => dispatch => dispatch({
  type: MWA_SELECT_JOB,
  id,
});

export const mwaFetchJobs = () => _startFetching;

// update once a 5 mins or so
const MWA_JOBS_FETCH_INTERVAL_MS = 1000 * 60 * 5;
let fetchProcId = null;

function _startFetching(dispatch, getState) {
  if (fetchProcId !== null) {
    return;
  }

  const fetchJobs = makeFetchJobs(dispatch, getState);
  // do the first tick right away - so we are actual
  fetchJobs();
  fetchProcId = window.setInterval(fetchJobs, MWA_JOBS_FETCH_INTERVAL_MS);
}

const makeFetchJobs = (dispatch, getState) => () => {
  return fetchJobsCall()
    .then((mwaData) => {
      // console.log(mwaData);
      _addJobs(dispatch, getState, mwaData.RESULTS);
    })
    .catch((e) => {
      console.error(e);
    });
};

const isDateTimeWithinTimeframe = (fromDateTime, toDateTime, refDateTime) =>
  (refDateTime.getTime() > fromDateTime.getTime()
  && refDateTime.getTime() < toDateTime.getTime());

const jobWithinTimeframe = (from, to, aJob) => {
  const begin = moment(aJob.DT_FIELD_BEGIN).toDate();
  const end = moment(aJob.DT_FIELD_END).toDate();
  const open = moment(aJob.DT_JOB_OPEN).toDate();
  const close = moment(aJob.DT_JOB_CLOSE).toDate();
  return isDateTimeWithinTimeframe(from, to, begin)
        || isDateTimeWithinTimeframe(from, to, end)
        || isDateTimeWithinTimeframe(from, to, open)
        || isDateTimeWithinTimeframe(from, to, close)
        || isDateTimeWithinTimeframe(begin, end, from);
};

export function mwaFetchChronicleJobs(vehicleId, dateFrom, dateTo, dispatch) {
  // dates like this '20170325',
  // pad from-to by one day
  const fromDate = moment(dateFrom).subtract(1, 'days').toDate();
  const toDate = moment(dateTo).add(1, 'days').toDate();

  return fetchJobsCall({ fromDate, toDate })
    .then((mwaData) => {
      // console.log(mwaData);
      // const myJobs = mwaData.RESULTS.filter(aJob => mapJobToCar(aJob.TEAM_ID) === vehicleId);
      const myJobsFltr = mwaData.RESULTS.filter(aJob => mapJobToCar(aJob.TEAM_ID) === vehicleId
          && jobWithinTimeframe(dateFrom, dateTo, aJob))
          .map(aJob => Object.assign({}, aJob, {
            id: aJob.WLMA_JOB_CODE,
            name: aJob.WLMA_JOB_CODE,
            begin: moment(aJob.DT_FIELD_BEGIN).toDate(),
            end: moment(aJob.DT_FIELD_END).toDate(),
          }));
          // .forEach(aJob => ensureHasLocations(aJob));
      console.log(myJobsFltr);
      dispatch(chronicleMWAJobs(vehicleId, myJobsFltr));
    })
    .catch((e) => {
      console.error(e);
    });
}

const ensureHasLocations = (aJob) => {
  if (aJob.X === null
  || aJob.Y === null) {
    // aJob.X = 13.7030484;
    // aJob.Y = 100.5924076;
    aJob.X = 13.807258;
    aJob.Y = 100.407345;
    aJob.activityStatus = 'dead';
  }
  aJob.isDelayedWithIgnitionOff = false;
};

const invalidJob = aJob => (
  aJob.X === null
  || aJob.Y === null
  || (aJob.JOB_STATUS_CODE !== 'J01'
    && aJob.JOB_STATUS_CODE !== 'J02'
    && aJob.JOB_STATUS_CODE !== 'J03')
  );

const carTeamMapDev = {
  1045: '70c5ff84-4d49-411c-92d1-d4b61cc19b67',
  1046: '2cd1d26c-7dac-4fd1-a25a-94c7780f8ce5',
  1047: '0a622082-fba9-4824-a551-81717f7ca3ea',
  1048: 'f3e9407e-678f-4db4-8d70-28034520b895',
  1049: 'd664e1f4-a91a-4b0c-9a11-bdb763c968b6',
  1050: 'e2d68606-6b08-46e3-bbe0-0aee3656dae2',
  1078: 'f58344f0-0499-4a6c-9f9b-c811d16e1267',
  1079: '11898c6d-80bf-480d-8885-3f9cc290097a',
  54299: 'afef9397-7618-4209-a87d-5bbf70e6361b',
};

const carTeamMapStage = {
  1045: 'f0b72aec-a835-4535-95d0-704467469598',
  1046: '2762f192-5b31-4785-96ba-3eae272d78ab',
  1047: 'ab2bd3ee-99b7-4842-9308-842b1cdcf88d',
  1048: '8492f814-9ead-4402-a07b-ab08ac156df2',
  1049: '2ffc27e6-465c-42b6-9e9d-1c09f8e656d6',
  1050: 'de8bf0d9-126c-4b27-863a-26e35fdb3058',
  1078: '12a4cb82-89d7-42ae-a281-1d5ede3ab647',
  1079: 'f867c6e6-91d3-4eca-8aab-63c707ec3b21',
  54299: '53ac221b-829c-41c4-a3ea-2c6522164d25',
};

const carTeamMapProd = {
  1045: 'b733c6aa-28f2-41ae-ac51-e5eba471ae44',
  1046: '4ad29542-d6dd-405f-aa43-79bd6f295aef',
  1047: '7bff454b-60f8-41da-a1c5-547d23b1c9e6',
  1048: '31161cf2-928c-4326-a48b-2355a789c57f',
  1049: '55428289-f9ff-4118-b3e3-3a5efaf7afd6',
  1050: '8b1bbfb9-f653-442e-b847-3833ba98a57b',
  1078: '033abd90-7541-4f75-81c3-a1886e64ca4c',
  1079: '25ee5596-ccaa-477c-855d-1a220664491a',
  54299: '737eea9e-9aa6-416d-9866-6279c72b0838',
};

//  a04ea779-71f4-45df-b226-14a845a26084

const mapJobToCar = (aJobKey) => {
  const teamMap = (onDev || onLocal) ? carTeamMapDev : (onStage ? carTeamMapStage : carTeamMapProd);
  // const teamMap = carTeamMapProd; // carTeamMapStage;
  if (!(aJobKey in teamMap)) {
    return null;
  }
  return teamMap[aJobKey];
};

export function mwaGetJobsForVehicle(vehicleId, mwaArray) {
  return mwaArray.filter(aJob => (mapJobToCar(aJob.TEAM_ID) === vehicleId));
}

function _addJobs(dispatch, getState, mwaJobs) {
  const jobs = {};
  const carsJobs = {};
  const processedList = getProcessedVehicles(getState());

  mwaJobs.forEach((aJob) => {
    ensureHasLocations(aJob);
    if (!invalidJob(aJob)) {
      const ownerCarId = mapJobToCar(aJob.TEAM_ID);
      if (ownerCarId !== null) {
        const imLocalVehicle = processedList.get(ownerCarId);
        if (imLocalVehicle !== undefined) {
          aJob.id = aJob.WLMA_JOB_CODE;
          aJob.name = aJob.WLMA_JOB_CODE;
          aJob.vehicleId = ownerCarId;
          aJob.vehicleName = imLocalVehicle.getIn(['original', 'name']);
          aJob.filteredOut = false;
          jobs[aJob.WLMA_JOB_CODE] = aJob;
          if (!(ownerCarId in carsJobs)) {
            carsJobs[ownerCarId] = [aJob.id];
          } else {
            carsJobs[ownerCarId].push(aJob.id);
          }
        }
      }
    }
  });

  dispatch(_mwaJobs(jobs));
  for (const property in carsJobs) {
    if (carsJobs.hasOwnProperty(property)) {
      const vehId = property;
      dispatch(vehiclesActions._vehicleUpdate({
        mwa: {
          jobs: carsJobs[vehId],
        },
      },
          vehId));
    }
  }
}

function _filterMWA({ searchString }, dispatch, getState) {
  const originJobs = getMWAJobsAsIM(getState());
  const options = {
    objectsList: originJobs,
    searchString,
    path: 'name',
  };
  const filteredJobs = filterProcessedListByName(options);
  dispatch(_mwaJobs(filteredJobs));
}

const _mwaJobs = jobs => ({
  type: MWA_ADD_JOBS,
  jobs,
});
