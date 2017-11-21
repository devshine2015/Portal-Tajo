import { api } from 'utils/api';
import endpoints from 'configs/endpoints';
import {
  makeTimeRangeParams,
} from 'utils/dateTimeUtils';


export const UPDATE_FLEET_OWERVIEW = 'upFleetOverView';
export const UPDATE_FLEET_FUEL = 'upFleetFuel';

export const fetchFleetOverview = timeRange => (dispatch) => {
  const params = { ...makeTimeRangeParams(timeRange.fromDate, timeRange.toDate),
    tzoffset: 0,
  };
  _fetchFleetOverview(params, dispatch);
  _fetchFleetFuel(params, dispatch);
};

const _fetchFleetOverview = (params, dispatch) => {
  const { url, method } = endpoints.getFleetOverview(params);

  // dispatch(fleetIsReady(false));

  api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(_setFleetOverviewData(overview));
    });
  // return Promise.resolve({ ready: true });
  // dispatch(_setFleetOverviewData());
};

const _fetchFleetFuel = (params, dispatch) => {
  const { url, method } = endpoints.getFleetFuel(params);

  api[method](url)
    .then(response => response.json())
    .then((overview) => {
      dispatch(_setFleetFuelData(overview));
    });
};


const _setFleetOverviewData = () => ({
  type: UPDATE_FLEET_OWERVIEW,
  totalDist: 1,
  avgSpeed: 2,
  totalRunTime: 3,
  totalDriveTime: 4,
  totalIdleTime: 5,
});

const _setFleetFuelData = () => ({
  type: UPDATE_FLEET_FUEL,
  toatalFuel: 51, //overview.consumption
});

