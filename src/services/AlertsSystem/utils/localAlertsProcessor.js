import * as alertKinds from 'services/AlertsSystem/alertKinds';

const LocalAlertStatuses = {
  OK: 'ok',
  Warning: 'wrn',
  Alert: 'alrt',
};

const conditionsToCheck = {};

const makeLocalEntryForAlertKind = (alertCondition, checkFunc) => ({
  alertConditionId: alertCondition.id,
  alertKind: alertCondition.kind,
  checkFunc,
});


const addLocalAlertCondition = function (alertCondition) {
  switch (alertCondition.kind) {
    case alertKinds._ALERT_KIND_TEMPERATURE:
      conditionsToCheck[alertCondition.id] = makeLocalEntryForAlertKind(alertCondition,
        (vehicleObj) => {
        // no temperature alert when ignition off
          if (vehicleObj.temp !== undefined
          && vehicleObj.ignitionOn !== 0) {
            return vehicleObj.temp >= alertCondition.maxTemp ? LocalAlertStatuses.Alert : LocalAlertStatuses.OK;
          }
          return LocalAlertStatuses.OK;
        });
      break;
    case alertKinds._ALERT_KIND_ODO:
      conditionsToCheck[alertCondition.id] = makeLocalEntryForAlertKind(alertCondition,
        (vehicleObj) => {
          const mnyCycle = alertCondition.odoValue; // : 25000;
          const mntZero = vehicleObj.lastServiceOdo;
          const mntEnd = mntZero + mnyCycle;
          const vehCurrent = vehicleObj.dist.total / 1000;

          const distToNextService = mntEnd - vehCurrent;
          return distToNextService <= 0 ? LocalAlertStatuses.Alert
            : (distToNextService < 1000 ? LocalAlertStatuses.Warning : LocalAlertStatuses.OK);
        });
      break;
    default:
      break;
  }
};

// const getVehicleAlertState = (vehicleAlertIdsArray, vehicleStats, vehicleObj = null) => {
//   const result = {};
//   vehicleAlertIdsArray.forEach(cndId =>
//     result[conditionsToCheck[cndId]] = result[conditionsToCheck[cndId]].checkFunc(vehicleStats, vehicleObj));
// };

const getVehicleAlertState = (vehicleObj) => {
  const result = {};
  if (vehicleObj.alerts !== undefined) {
    vehicleObj.alerts.forEach((cndId) => {
      if (conditionsToCheck[cndId] !== undefined) {
        result[conditionsToCheck[cndId].alertKind] = conditionsToCheck[cndId].checkFunc(vehicleObj);
      }
    });
  }
  return result;
};

// little helper
const isAlertStateHasAlert = (alertState, alertKind) =>
  alertState[alertKind] !== undefined && alertState[alertKind] === LocalAlertStatuses.Alert;

const isAlertStateHasWarning = (alertState, alertKind) =>
  alertState[alertKind] !== undefined && alertState[alertKind] === LocalAlertStatuses.Warning;

const localAlertsHelper = {
  addLocalAlertCondition,
  getVehicleAlertState,
  isAlertStateHasAlert,
  isAlertStateHasWarning,
};

export default localAlertsHelper;
