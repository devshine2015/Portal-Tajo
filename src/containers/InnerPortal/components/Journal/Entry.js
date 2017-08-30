import React, { PropTypes } from 'react';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import DissmissIcon from 'material-ui/svg-icons/content/clear';
import { getAlertByKind } from 'services/AlertsSystem/alertKinds';
import classes from './Entry.classes';

const STYLES = {
  dissmissIcon: {
    width: 16,
    height: 16,
  },
};

const SHOW_DISSMISS_BUTTON = false;

const onDissmissClick = props => () => {
  props.onClick(props.id);
};

const DissmissBtn = (props) => {
  return (
    <div
      className={css(classes.dissmiss)}
      onClick={onDissmissClick(props)}
    >
      <DissmissIcon color="#666" style={STYLES.dissmissIcon} />
    </div>
  );
};

DissmissBtn.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
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
  time,
  eventName,
  ownerName,
  kindNiceName,
}) => {
  return (
    <div className={css(classes.details)}>
      <div className={css(classes.details__header)}>
        { kindNiceName }
        <div className={css(classes.details__time)}>
          { moment(time).format('DD-MM-YY HH:mm') }
        </div>
      </div>
      <div className={css(classes.details__body)}>
        { ownerName }, { eventName }
      </div>
    </div>
  );
};

EventDetails.propTypes = {
  time: PropTypes.number.isRequired,
  eventName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  kindNiceName: PropTypes.string.isRequired,
};

const JournalEntry = ({
  id,
  eventTS,
  eventKind,
  eventName,
  ownerName,
  onDissmiss,
  isUnread,
}) => {
  const { icon, niceName } = getAlertByKind(eventKind);

  return (
    <div className={css([classes.entry, isUnread && classes.entry_unread])}>
      <EventIcon icon={icon} />
      <EventDetails
        ownerName={ownerName}
        eventName={eventName}
        kindNiceName={niceName}
        time={eventTS}
      />
      { SHOW_DISSMISS_BUTTON && <DissmissBtn onClick={onDissmiss} id={id} /> }
    </div>
  );
};

JournalEntry.propTypes = {
  id: PropTypes.string.isRequired,
  eventTS: PropTypes.number.isRequired,
  eventKind: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  onDissmiss: PropTypes.func.isRequired,
  isUnread: PropTypes.bool.isRequired,
};

export default JournalEntry;
