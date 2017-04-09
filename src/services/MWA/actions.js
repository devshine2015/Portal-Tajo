// import 'whatwg-fetch';
// import fetchJsonp from 'fetch-jsonp';
// require ('jsonp');
// import jsonp 'jsonp';
// import { makeLocalAlertCondition } from './alertConditionHelper';
import endpoints from 'configs/endpoints';
import { api } from 'utils/api';
import { getProcessedVehicles } from 'services/FleetModel/reducer';
import { vehiclesActions } from 'services/FleetModel/actions';
import moment from 'moment';
import { onStage, onDev, onLocal } from 'configs';
import { getMWAJobsAsIM } from './reducer';
import { filterProcessedListByName } from '../FleetModel/utils/filtering';


// import staticData from './staticData';

export const MWA_ADD_JOBS = 'mwa/add';
export const MWA_SELECT_JOB = 'mwa/slct';

export const mwaFilterJobs = (searchString) => (dispatch, getState) =>
  _filterMWA({ searchString }, dispatch, getState);

export const mwaSelectJob = (id) => (dispatch) => dispatch({
  type: MWA_SELECT_JOB,
  id,
});

// export const mwaFetchJobs = () => _fetchJobs;
export const mwaFetchJobs = () => _startFetching;

// update once a 5 mins or so
const MWA_JOBS_FETCH_INTERVAL_MS = 1000 * 60 * 5;
let fetchProcId = null;

function _startFetching(dispatch, getState) {
  if (fetchProcId !== null) {
    return;
  }
  // do the first tick right away - so we are actual
  _fetchFunk(dispatch, getState)();
  fetchProcId = window.setInterval(_fetchFunk(dispatch, getState), MWA_JOBS_FETCH_INTERVAL_MS);
}

const _fetchFunk = (dispatch, getState) => () => {
  _fetchJobs(dispatch, getState);
};


const padZero = inNumber => inNumber < 10 ? `0${inNumber}` : inNumber;
export const makeMWADate = inDate =>
  `${inDate.getFullYear()}${padZero(inDate.getMonth() + 1)}${padZero(inDate.getDate())}`;

function _fetchJobs(dispatch, getState) {
  const dateFrom = moment().subtract(1, 'days').toDate();
  const dateTo = moment().toDate();

  // dates like this '20170325',
  const { url, method, apiVersion } = endpoints.getMWAJobs({
    from: makeMWADate(dateFrom),
    to: makeMWADate(dateTo),
  });
  return api[method](url, { apiVersion })
    .then((response) => (
      response.json())
    )
    .then(mwaData => {
      // console.log(mwaData);
      _addJobs(dispatch, getState, mwaData.RESULTS);
    })
    .catch(e => {
      console.error(e);
    });
}


function asdf(data) {
  console.log('then --- ');
  const text = data.text();
  console.log('then --- ', text);
  return data.json();
}

function _fetchJobsNotWorking(dispatch, getState) {
  // const theUrl = 'http://115.31.184.236:2557/WLMA-SERVICE-GATEWAY/WlmaRepairJobServlet?USER=00100193&PASSWORD=81dc9bdb52d04dc20036dbd8313ed055&BRANCH_CODE=01&DATE_BEGIN=20170325';
  const theUrl = 'http://115.31.184.236:2557/WLMA-SERVICE-GATEWAY/WlmaRepairJobServlet?USER=00100193&PASSWORD=81dc9bdb52d04dc20036dbd8313ed055&BRANCH_CODE=01&DATE_BEGIN=20170328';

  // let xhr = new XMLHttpRequest();
  // xhr.open('GET', theUrl, true);
  // // xhr.overrideMimeType("text/plain; charset=x-user-defined");
  //    xhr.setRequestHeader('mode', 'no-cors');
  //   //  xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
  //   //   xhr.setRequestHeader('Content-type', 'application/ecmascript');
  //   //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  // xhr.onreadystatechange = (e) => {
  //   console.log(xhr.readyState);
  //   console.log(xhr.status);
  //   console.log(xhr.responseText);
  // };
  // xhr.onload = function (e) {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status === 200) {
  //       console.log(xhr.responseText);
  //     } else {
  //       console.error(xhr.statusText);
  //     }
  //   }
  // };

  // xhr.send();

  //   fetchJsonp(theUrl, { headers: {
  //      'content-type': 'application/json',
  //   accept: 'application/json',
  // }
  // })
  //     .then(asdf)
  //   // .then(function(json) {
  //   //   console.log('parsed json', json);
  //   // })
  //     .catch(function (ex) {
  //       console.log('parsing failed', ex);
  //     });

  // jsonp(theUrl, {}, (err, data) =>
  // {
  //   console.log(data);
  //   const jsn = data.json();
  // });

  return fetch(theUrl, {
    mode: 'no-cors',
    headers: {
      //  mode: 'no-cors',
      'content-type': 'application/json',
      //  accept: 'application/json',
      //  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      Accept: 'application/json;charset=UTF-8',
      'Accept-Encoding': 'gzip, deflate, sdch',
      // method: method || null,
      // body: data || null,
    }
  })
    // .then(() => 'asdf')
    // .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      // debugger
      // console.log(resp.headers.get('Content-Type'))
      // console.log(resp.headers.get('Date'))
      // console.log(resp.response)
      // console.log(resp.statusText)
      // const txt = resp.text();
      const jsn = resp.json();
      //  const bdy = resp.body;
      return jsn;
    })
    .then(aData => {
      console.log(aData);
    })
    // .then(handleResponse)
    // .then(jobs => {
    //   _addJobs(dispatch, alerts);
    // })
    .catch(e => {
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

const invalidJob = (aJob) => (
  aJob.X === null
  || aJob.Y === null
  || (aJob.JOB_STATUS_CODE !== 'J01'
    && aJob.JOB_STATUS_CODE !== 'J02'
    && aJob.JOB_STATUS_CODE !== 'J03')
  );

const carTeamMapDev = {
  '1045': '70c5ff84-4d49-411c-92d1-d4b61cc19b67',
  '1046': '2cd1d26c-7dac-4fd1-a25a-94c7780f8ce5',
  '1047': '0a622082-fba9-4824-a551-81717f7ca3ea',
  '1048': 'f3e9407e-678f-4db4-8d70-28034520b895',
  '1049': 'd664e1f4-a91a-4b0c-9a11-bdb763c968b6',
  '1050': 'e2d68606-6b08-46e3-bbe0-0aee3656dae2',
  '1078': 'f58344f0-0499-4a6c-9f9b-c811d16e1267',
  '1079': '11898c6d-80bf-480d-8885-3f9cc290097a',
  '54299': 'afef9397-7618-4209-a87d-5bbf70e6361b',
};

const carTeamMapStage = {
  '1045': 'f0b72aec-a835-4535-95d0-704467469598',
  '1046': '2762f192-5b31-4785-96ba-3eae272d78ab',
  '1047': 'ab2bd3ee-99b7-4842-9308-842b1cdcf88d',
  '1048': '8492f814-9ead-4402-a07b-ab08ac156df2',
  '1049': '2ffc27e6-465c-42b6-9e9d-1c09f8e656d6',
  '1050': 'de8bf0d9-126c-4b27-863a-26e35fdb3058',
  '1078': '12a4cb82-89d7-42ae-a281-1d5ede3ab647',
  '1079': 'f867c6e6-91d3-4eca-8aab-63c707ec3b21',
  '54299': '53ac221b-829c-41c4-a3ea-2c6522164d25',
};

const carTeamMapProd = {
  '1045': 'b733c6aa-28f2-41ae-ac51-e5eba471ae44',
  '1046': '4ad29542-d6dd-405f-aa43-79bd6f295aef',
  '1047': '7bff454b-60f8-41da-a1c5-547d23b1c9e6',
  '1048': '31161cf2-928c-4326-a48b-2355a789c57f',
  '1049': '55428289-f9ff-4118-b3e3-3a5efaf7afd6',
  '1050': '8b1bbfb9-f653-442e-b847-3833ba98a57b',
  '1078': '033abd90-7541-4f75-81c3-a1886e64ca4c',
  '1079': '25ee5596-ccaa-477c-855d-1a220664491a',
  '54299': '737eea9e-9aa6-416d-9866-6279c72b0838',
};

//  a04ea779-71f4-45df-b226-14a845a26084

const mapJobToCar = (aJobKey) => {
  const teamMap = (onDev || onLocal) ? carTeamMapDev : (onStage ? carTeamMapStage : carTeamMapProd);
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

  mwaJobs.forEach(aJob => {
    ensureHasLocations(aJob);
    if (!invalidJob(aJob)) {
      let ownerCarId = mapJobToCar(aJob.TEAM_ID);
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
  for (var property in carsJobs) {
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

const _mwaJobs = (jobs) => ({
  type: MWA_ADD_JOBS,
  jobs,
});
