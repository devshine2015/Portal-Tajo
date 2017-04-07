
import moment from 'moment';
import { getAlertByKind } from './alertKinds';
import * as alertKinds from 'services/AlertsSystem/alertKinds';

export const _NEW_LOCAL_ALERT_ID_ = 'newAlert';

export const _dev_makeLocalAlertCondition = (id, name, kind) => (
    { id,
        name,
        kind,
    }
);

const safeGetFromMeta = (originObject, propName, defValue) => (
    originObject.meta === undefined || originObject.meta[propName] === undefined ?
                defValue : originObject.meta[propName]
);

export const makeLocalAlertCondition = (originObject) => (
    { id: originObject.id,
        name: safeGetFromMeta(originObject, 'name', 'No Name'),
        kind: originObject.kind,
        maxTemp: originObject.aboveTemp || 0,
        maxSpeed: originObject.maxSpeed || 0,
        odoValue: originObject.odoValue || 0,
        gfId: originObject.gfId || '',
        onEnter: safeGetFromMeta(originObject, 'onEnter', false) === 'true',
        onExit: safeGetFromMeta(originObject, 'onExit', false) === 'true',
        driveTimeHvr: originObject.driveTimeSec !== undefined ? originObject.driveTimeSec / 60 / 60 : 2.5,
    }
);


export const makeNewAlertConditionTemplate = () => (
    { id: _NEW_LOCAL_ALERT_ID_,
        kind: alertKinds._ALERT_KIND_SPEEDING,
        name: 'Speed over 45 kmh Alert',
        maxSpeed: 45,
    }
);

export const makeAlertConditionBackEndObject = (inState) => (
   Object.assign({},
    makeGenericAlrt(inState),
    getAlertByKind(inState.kind).makeBEObject(inState))
);

const makeGenericAlrt = (inState) => (
  {
    id: inState.id,
    kind: inState.kind,
// "2017-03-06T17:51:59.298+01:00"
//    created: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ'),
    created: '2017-03-06T18:29:50.950+1100',
    status: '',
    meta: {
      name: inState.name,
    },
  }
);
