import React from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import { getAlertByKind } from 'services/AlertsSystem/alertKinds';
import classes from './TimelineEvent.classes';

const EventTime = ({
  time,
}) => {
  return (
    <div className={css(classes.time)}>
      { moment(time).fromNow() }
    </div>
  );
};

EventTime.propTypes = {
  time: React.PropTypes.number.isRequired,
};

const EventIcon = ({
  icon,
}) => {
  return (
    <div className={css(classes.iconWrapper)}>
      { icon }
    </div>
  );
};

EventIcon.propTypes = {
  icon: React.PropTypes.element.isRequired,
};

const EventDetails = ({
  eventName,
  ownerName,
  kindNiceName,
}) => {
  return (
    <div className={css(classes.detailsWrapper)}>
      <div className={css(classes.detailsHeader)}>
        { kindNiceName }
      </div>
      <div className={css(classes.detailsBody)}>
        { ownerName }, { eventName }
      </div>
    </div>
  );
};

EventDetails.propTypes = {
  eventName: React.PropTypes.string.isRequired,
  ownerName: React.PropTypes.string.isRequired,
  kindNiceName: React.PropTypes.string.isRequired,
};

const TimelineEvent = ({
  eventTS,
  ownerName,
  eventKind,
  eventName,
}) => {
  const { icon, niceName } = getAlertByKind(eventKind);

  return (
    <div className={css(classes.wrapper)}>
      <EventTime time={eventTS} />
      <EventIcon icon={icon} />
      <EventDetails
        ownerName={ownerName}
        eventName={eventName}
        kindNiceName={niceName}
      />
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
