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

  const staticDevReportData = {
    totalConsumption: 10,
    totalDist: 20,
    ltrPerKm: 30,
    avgSpeed: 40,
    series: {
    },
    alerts: [],
  };

  const urls = [];
  const localReportsData = {};
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
          // localReportsData[id] = reportData;
          localReportsData[id] = staticDevReportData;
        }),
    ),
  )
    .then(() => {
      dispatch(_setVehicleFuel(vehicleId, localReportsData));
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

