import React from 'react';
import PropTypes from 'prop-types';
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
  time: PropTypes.number.isRequired,
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
  icon: PropTypes.element.isRequired,
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
  eventName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  kindNiceName: PropTypes.string.isRequired,
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
  eventTS: PropTypes.number.isRequired,
  eventKind: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
};

TimelineEvent.defaultProps = {};

export default TimelineEvent;
