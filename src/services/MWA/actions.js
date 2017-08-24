import moment from 'moment';
import R from 'ramda';
import { getProcessedVehicles } from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import { filterProcessedListByName } from 'services/FleetModel/utils/filtering';
import { chronicleMWAJobs } from 'screens/Chronicle/actions';
import { getMWAJobsAsIM } from './reducer';
import fetchJobsCall, {
  mapTeamToCar,
} from './helpers';

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
      // const myJobs = mwaData.RESULTS.filter(aJob => mapTeamToCar(aJob.TEAM_ID) === vehicleId);
      const myJobsFltr = mwaData.RESULTS.filter(aJob => mapTeamToCar(aJob.TEAM_ID) === vehicleId
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

const VALID_JOB_CODES = ['J01', 'J02', 'J03'];
const validStatusCode = statusCode => R.contains(statusCode, VALID_JOB_CODES);

const invalidJob = job => (
  job.X === null
  || job.Y === null
  || !validStatusCode(job.JOB_STATUS_CODE));

function _addJobs(dispatch, getState, mwaJobs) {
  const jobs = {};
  const carsJobs = {};
  const processedList = getProcessedVehicles(getState());

  mwaJobs.forEach((aJob) => {
    ensureHasLocations(aJob);
    if (!invalidJob(aJob)) {
      const ownerCarId = mapTeamToCar(aJob.TEAM_ID);
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
