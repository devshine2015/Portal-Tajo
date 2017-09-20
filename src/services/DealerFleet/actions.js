import data from './dummyData.json';

export const FETCH_DEALER_VEHICLES_SUCCESS = 'fetch dealer\'s vehicles success';
export const FETCH_DEALER_VEHICLES_FAILURE = 'fetch dealer\'s vehicles failure';

export const fetchVehicles = () => async (dispatch) => {
  try {
    const result = await data;
    const vehiclesMap = {};
    const vehiclesList = [];

    result.forEach((el) => {
      vehiclesMap[el.id] = el;
      vehiclesList.push(el.id);
    });

    dispatch({
      type: FETCH_DEALER_VEHICLES_SUCCESS,
      map: vehiclesMap,
      list: vehiclesList,
    });

    return result;
  } catch (e) {
    dispatch({
      type: FETCH_DEALER_VEHICLES_FAILURE,
    });

    console.error(e);

    throw new Error(e);
  }
};

