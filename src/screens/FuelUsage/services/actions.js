// import moment from 'moment';
import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';
// import dealerSelectors from 'services/Dealer/selectors';
import { getVehiclesExSorted } from '../../../services/FleetModel/reducer';


export const UPDATE_VEHICLE_FUEL_REPORT = 'upVehFuel';


export const fetchVehicleFuelReport = (vehicleId, timeRange) => (dispatch, getState) => {
  const params = { ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
    tzoffset: 0,
  };
  // const selectedSubFleet = dealerSelectors.getSelectedSubFleet(getState());
  // if (selectedSubFleet) {
  //   params.subFleet = selectedSubFleet;
  // }

  const reportSData = [{
    id: '8f7ce33d-025d-4ec6-b770-dcefadb88111',
    totalConsumption: 10,
    totalDist: 20,
    ltrPerKm: 30,
    avgSpeed: 40,
    series: {
    },
    alerts: [],
  }, {
    id: '689cefe8-bf9b-4747-8424-7620c23187fa',
    totalConsumption: 50,
    totalDist: 60,
    ltrPerKm: 70,
    avgSpeed: 80,
    series: {
    },
    alerts: [],
  }];

  const urls = [];
  const allReportsData = [];
  const vehiclesList = getVehiclesExSorted(getState());
  vehiclesList.forEach((vehicle) => {
    const aVehicleId = vehicle.id;
    urls.push({
      ...endpoints.getVehicleFuelReport(aVehicleId, params),
    });
  }, this);
  return Promise.all(
    urls.map(({ url, method, id }) =>
      api[method](url)
        .then(response => response.json())
        .then((reportData) => {
          reportData.id = id;
          allReportsData.push(reportData);
        }),
    ),
  )
    .then(() => {
      dispatch(_setVehicleFuel(vehicleId, reportSData));
    });
  // const { url, method } = endpoints.getVehicleFuelReport(vehicleId, params);

  // api[method](url)
  //   .then(response => response.json())
  //   .then((reportData) => {
  //     dispatch(_setVehicleFuel(vehicleId, reportSData));
  //     console.log(reportData);
  //   });
};
// _fetchVehicleFuelReport(vehicleId, timeRange, dispatch, getState);


// function _fetchVehicleFuelReport(vehicleId, timeRange, dispatch, getState) {
//   const params = { ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
//     tzoffset: 0,
//   };
//   const selectedSubFleet = dealerSelectors.getSelectedSubFleet(getState());
//   if (selectedSubFleet) {
//     params.subFleet = selectedSubFleet;
//   }

//   const { url, method } = endpoints.getVehicleFuelReport(params);

//   api[method](url)
//     .then(response => response.json())
//     .then((reportData) => {
//       dispatch(_setVehicleFuel(vehicleId, reportData));
//       console.log("vehicle fuel report " + reportData);
//     });
// }

const _setVehicleFuel = (vehicleId, reportData) => ({
  type: UPDATE_VEHICLE_FUEL_REPORT,
  vehicleId,
  consumption: reportData,
});

