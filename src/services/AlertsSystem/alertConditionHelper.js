
import moment from 'moment';
import { getAlertByKind } from './alertKinds';

export const _NEW_LOCAL_ALERT_ID_ = 'newAlert';

export const _dev_makeLocalAlertCondition = (id, name, kind) => (
    { id,
        name,
        kind,
    }
);

export const makeLocalAlertCondition = (originObject) => (
    { id: originObject.id,
        name: originObject.meta === undefined || originObject.meta.name === undefined ?
                'No Name' : originObject.meta.name,
        kind: originObject.kind,
    }
);


export const makeNewAlertConditionTemplate = () => (
    { id: _NEW_LOCAL_ALERT_ID_,
        name: 'new Alert',
        kind: 'none',
    }
);

export const makeAlertConditionBackEndObject = (inState) => (
   Object.assign({},
    makeGenericAlrt(inState),
    getAlertByKind(inState.kind).makeBEObject(inState))
);

const makeGenericAlrt = (inState) => (
  {
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
