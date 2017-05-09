import React from 'react';

const TimelineEvent = ({
  // eventTS,
  ownerName,
  eventKind,
  eventName,
}) => {
  return (
    <div className="wrapper">
      { ownerName }
      { eventKind }
      { eventName }
    </div>
  );
};

TimelineEvent.propTypes = {
  eventTS: React.PropTypes.number.isRequired,
  eventKind: React.PropTypes.string.isRequired,
  eventName: React.PropTypes.string.isRequired,
  ownerName: React.PropTypes.string.isRequired,
};

TimelineEvent.defaultProps = {};

export default TimelineEvent;
