import storage from 'utils/localStorage';

export const ALRT_TYPES_SET = 'alrt/typesSet';
export const ALRT_CONDITON_ADD = 'alrt/conditionAdd';
export const ALRT_EVEENTS_ADD = 'alrt/eventsAdd';

const _setTypes = (types) => ({
  type: ALRT_TYPES_SET,
  types,
});
