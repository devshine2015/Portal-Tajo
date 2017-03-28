// import 'whatwg-fetch';
import fetchJsonp from 'fetch-jsonp';
// require ('jsonp');
// import jsonp 'jsonp';
// import { makeLocalAlertCondition } from './alertConditionHelper';

// export const ALRT_TYPES_SET = 'alrt/typesSet';

export const mwaFetchJobs = () => _fetchJobs;

function asdf(data) {
   console.log('then --- ');
    const text = data.text();
      console.log('then --- ', text);
    return data.json();  
}

function _fetchJobs(dispatch) {
  const theUrl = 'http://115.31.184.236:2557/WLMA-SERVICE-GATEWAY/WlmaRepairJobServlet?USER=00100193&PASSWORD=81dc9bdb52d04dc20036dbd8313ed055&BRANCH_CODE=01&DATE_BEGIN=20170325';

fetchJsonp(theUrl);
  // .then(asdf)
  // .then(function(json) {
  //   console.log('parsed json', json);
  // }).catch(function(ex) {
  //   console.log('parsing failed', ex);
  // })

// jsonp(theUrl, {}, (err, data) => 
// {
//   console.log(data);
//   const jsn = data.json();
// });

  // return fetch(theUrl, {
  //           mode: 'no-cors',
  //           // method: method || null,
  //           // body: data || null,
  //       })
  //       .then(resp => {
  //         // console.log(resp)
  // // console.log(resp.headers.get('Content-Type'))
  // // console.log(resp.headers.get('Date'))
  // // console.log(resp.response)
  // // console.log(resp.statusText)
  // const txt = resp.text();
  // const jsn = resp.json();
  //        const bdy = resp.body;
  //        return jsn;
  //   })
  //       // .then(handleResponse)
  //       .then(jobs => {
  //     _addJobs(dispatch, alerts);
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   });
}
function _addJobs(dispatch, backEndAlerts) {
  backEndAlerts.forEach((aElement) => {
    dispatch(_conditionAdd(makeLocalAlertCondition(aElement)));
  }, this);
}

const _conditionAdd = (alertObj) => ({
  type: ALRT_CONDITON_ADD,
  alertObj,
});

function handleResponse(response) {
  const txt = response.text();

  return response.json();
}

const _vehicleAlerts = (vehicleId, alertsList) => ({
  type: ALRT_VEHICLE_ADD,
  vehicleId,
  alertsList,
});
