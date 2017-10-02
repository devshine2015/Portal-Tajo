import * as alertKinds from 'services/AlertsSystem/alertKinds';
import { getGFByIdFunc } from 'services/FleetModel/reducer';

export const _NEW_LOCAL_ALERT_ID_ = 'newAlert';

const safeGetFromMeta = (originObject, propName, defValue) => (
  originObject.meta === undefined || originObject.meta[propName] === undefined ?
    defValue : originObject.meta[propName]
);

const safeGetGFData = (originObject, state) => {
  if (originObject.gfId === undefined) {
    return { gfId: '', gfName: '' };
  }
  const theGF = getGFByIdFunc(state)(originObject.gfId);
  // TODO: need something smarter for invalid GFs
  if (theGF === null) {
    return { gfId: originObject.gfId, gfName: '_DELETED_GF_', gfInvalid: true };
  }
  return { gfId: originObject.gfId, gfName: theGF.name };
};

export const makeLocalAlertCondition = (originObject, state) => (
  { id: originObject.id,
    name: safeGetFromMeta(originObject, 'name', 'No Name'),
    kind: originObject.kind,
    maxTemp: originObject.aboveTemp || 0,
    maxSpeed: originObject.maxSpeed || 0,
    odoValue: originObject.odoValue || 0,
    fuelDiff: originObject.percentDiff || 0,
    // safely extracting those for GF alerts:
    // gfId:
    // gfName:
    // ^-- probably should store ref to GF object instead?
    ...safeGetGFData(originObject, state),
    onEnter: safeGetFromMeta(originObject, 'onEnter', false) === 'true',
    onExit: safeGetFromMeta(originObject, 'onExit', false) === 'true',
    driveTimeSec: originObject.driveTimeSec !== undefined ? originObject.driveTimeSec : 0,
  }
);

export const makeNewAlertConditionTemplate = () => (
  { id: _NEW_LOCAL_ALERT_ID_,
    kind: alertKinds._ALERT_KIND_SPEEDING,
    name: 'Speed over 45 kmh Alert',
    maxSpeed: 45,
  }
);

export const makeAlertConditionBackEndObject = inState => (
  Object.assign({},
    makeGenericAlrt(inState),
    alertKinds.getAlertByKind(inState.kind).makeBEObject(inState))
);

// TODO: temporary logic - GF alert conditions should be added
// on BeckEnd automatically
// remove this when implemented on BE side
export const makeGFAlertConditionBackEndObject = (gfObj, onEnter) => (
  Object.assign({},
    makeGenericAlrt({
      kind: alertKinds._ALERT_KIND_GF,
      // name: `${gfObj.name} ${onEnter ? ' enter' : ' exit'}`,
    }),
    alertKinds.getAlertByKind(alertKinds._ALERT_KIND_GF).makeBEObject({
      gfId: gfObj.id,
      name: `${gfObj.name} ${onEnter ? 'enter' : 'exit'}`,
      onEnter,
      onExit: !onEnter,
    }))
);

const makeGenericAlrt = inState => (
  {
    id: inState.id,
    kind: inState.kind,
    // "2017-03-06T17:51:59.298+01:00"
    // created: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ'),
    created: '2017-03-06T18:29:50.950+1100',
    status: '',
    meta: {
      name: inState.name,
    },
  }
);
