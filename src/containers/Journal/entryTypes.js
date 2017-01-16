// journal entries types
export const JRET_TEMPOFF_UP = 'jrt/tempUp';
export const JRET_TEMPOFF_DOWN = 'jrt/tempDw';
export const JRET_ENTER_DEPOT = 'jrt/enterDp';
export const JRET_LEAVE_DEPOT = 'jrt/leaveDp';

export const textForEventType = (eventType) => {
  switch (eventType) {
    case JRET_TEMPOFF_UP:
      return 'overheated';
    case JRET_TEMPOFF_DOWN:
      return 'too cold';
    case JRET_ENTER_DEPOT:
      return 'in Warehouse';
    case JRET_LEAVE_DEPOT:
      return 'out Main Warehouse';
    default:
      return '';
  }
};
