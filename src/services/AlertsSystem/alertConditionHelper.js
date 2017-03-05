
export const _NEW_LOCAL_ALERT_ID_ = 'newAlert';

export const _dev_makeLocalAlertCondition = (id, name, kind) => (
    { id,
        name,
        kind,
        limit: 35,
    }
);

export const makeNewAlertConditionTemplate = (id, name, kind) => (
    { id: _NEW_LOCAL_ALERT_ID_,
        name: 'new Alert',
        kind: 'none',
    }
);
