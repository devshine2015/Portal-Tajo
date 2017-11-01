import * as alertKinds from 'services/AlertsSystem/alertKinds';

const conditionsToCheck = {};

const addLocalAlertCondition = (alertCondition) => {
  switch (alertCondition.kind) {
    case alertKinds._ALERT_KIND_TEMPERATURE:
      conditionsToCheck[alertCondition.id] = {};
      conditionsToCheck[alertCondition.id].theConditionObj = alertCondition;
      conditionsToCheck[alertCondition.id].checkFunc = (vehicleObj) => {
        // no temperature alert when ignition off
        if (vehicleObj.temp !== undefined
          && vehicleObj.ignitionOn !== 0) {
          return vehicleObj.temp >= alertCondition.maxTemp;
        }
        return false;
      };
  }
};

// const getVehicleAlertStatus = (vehicleAlertIdsArray, vehicleStats, vehicleObj = null) => {
//   const result = {};
//   vehicleAlertIdsArray.forEach(cndId =>
//     result[conditionsToCheck[cndId]] = result[conditionsToCheck[cndId]].checkFunc(vehicleStats, vehicleObj));
// };

const getVehicleAlertStatus = (vehicleObj) => {
  const result = {};
  if (vehicleObj.alerts !== undefined) {
    vehicleObj.alerts.forEach((cndId) => {
      if (conditionsToCheck[cndId] !== undefined) {
        result[conditionsToCheck[cndId].theConditionObj.kind] = conditionsToCheck[cndId].checkFunc(vehicleObj);
      }
    });
  }
  return result;
};

// little helper
const isAlertStateHasAlert = (alertState, alertKind) => alertState[alertKind] !== undefined && alertState[alertKind];

const localAlertsHelper = {
  addLocalAlertCondition,
  getVehicleAlertStatus,
  isAlertStateHasAlert,
};

export default localAlertsHelper;
