import React from 'react';
// import { getAlertByKind } from 'services/AlertsSystem/alertKinds';

const TimelineEvent = ({
  // ts,
  vehicleId,
  // conditionId,
  // temp,
}) => {
  return (
    <div className="wrapper">
      { vehicleId }
    </div>
  );
};

TimelineEvent.propTypes = {
  // ts: React.PropTypes.string.isRequired,
  vehicleId: React.PropTypes.string.isRequired,
  // conditionId: React.PropTypes.string.isRequired,
  // temp: React.PropTypes.number,
};

TimelineEvent.defaultProps = {
  // temp: undefined,
};

export default TimelineEvent;
