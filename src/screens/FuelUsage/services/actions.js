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
    alerts: [
      {
        type: 'vehicle-temperature-alert',
        ev: {
          ts: '2017-11-03T16:04:35.000+0000',
          vehicleId: 'bdf3429d-1da5-4281-9c75-f1199fe2b837',
          conditionKind: 'temperature-alert',
          conditionId: '8eb0b823-9713-4b2e-91fe-3582506fb6d5',
          pos: {
            latlon: {
              lat: 20.037036895751953,
              lng: 95.93600463867188,
            },
            speed: 77.5,
            azimuth: 154,
            accuracy: 1,
            posTime: '2017-11-03T16:04:38.000+0000',
          },
          meta: {
            name: 'Flower',
          },
          temp: 11.75,
        },
      }, {
        type: 'vehicle-temperature-alert',
        ev: {
          ts: '2017-11-03T16:04:35.000+0000',
          vehicleId: 'bdf3429d-1da5-4281-9c75-f1199fe2b837',
          conditionKind: 'temperature-alert',
          conditionId: '8eb0b823-9713-4b2e-91fe-3582506fb6d5',
          pos: {
            latlon: {
              lat: 20.037036895751953,
              lng: 95.93600463867188,
            },
            speed: 77.5,
            azimuth: 154,
            accuracy: 1,
            posTime: '2017-11-03T16:04:38.000+0000',
          },
          meta: {
            name: 'Flower',
          },
          temp: 11.75,
        },
      },
    ],
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

