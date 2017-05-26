import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import { makeSingleDateString } from 'utils/dateTimeUtils';
import TimelineEvent from './TimelineEvent';
import classes from './AlertsTimeline.classes';

function _makeHeaderTimeRange(range = {}) {
  return {
    from: makeSingleDateString(range.startDate, range.startTime).format('DD-MM-YYYY HH:mm'),
    to: makeSingleDateString(range.endDate, range.endTime).format('DD-MM-YYYY HH:mm'),
  };
}

const EmptyTimeline = () => (
  <div className={css([classes.listWrapper, classes.listWrapper_empty])}>
    No events for specified period
  </div>
);

const DEFAULT_TIME_RANGE_TEXT = 'last 24 hours';

const HighlitedText = ({ children }) =>
  <span className={css(classes.header__sub_highlighted)}>{ children }</span>;

HighlitedText.propTypes = {
  children: React.PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

const PeriodText = ({ dateRange, isDefaultRange }) => {
  let Text;

  if (isDefaultRange) {
    Text = () => <HighlitedText>{ DEFAULT_TIME_RANGE_TEXT }</HighlitedText>;
  } else {
    Text = () => <span><HighlitedText>{dateRange.from}</HighlitedText> to <HighlitedText>{dateRange.to}</HighlitedText></span>;
  }

  return <Text />;
};

PeriodText.propTypes = {
  isDefaultRange: React.PropTypes.bool.isRequired,
  dateRange: React.PropTypes.shape({
    from: React.PropTypes.string,
    to: React.PropTypes.string,
  }).isRequired,
};

const Header = ({
  ...rest,
  amount,
}) => {
  return (
    <div className={css(classes.header)}>
      <h3 className={css(classes.header__main)}>Historical Timeline</h3>
      <p className={css(classes.header__sub)}>
        Showing <HighlitedText>{amount}</HighlitedText> events for <PeriodText {...rest} />
      </p>
    </div>
  );
};

Header.propTypes = {
  amount: React.PropTypes.number.isRequired,
  isDefaultRange: React.PropTypes.bool.isRequired,
  dateRange: React.PropTypes.shape({
    from: React.PropTypes.string,
    to: React.PropTypes.string,
  }),
};

Header.defaultTypes = {
  dateRange: undefined,
};

class AlertsTimeline extends React.Component {

  renderEvents() {
    return this.props.entries.map((event) => {
      return (
        <TimelineEvent
          {...event.toJS()}
          key={event.get('id')}
        />
      );
    });
  }

  render() {
    const range = _makeHeaderTimeRange(this.props.dateRange);

    return (
      <div className={css(classes.wrapper)}>
        <Header
          dateRange={range}
          amount={this.props.entries.size}
          isDefaultRange={this.props.displayDefaultRange}
        />

        { this.props.entries.size === 0 ? <EmptyTimeline /> : (
          <div className={css(classes.listWrapper)}>
            { this.renderEvents() }
          </div>
        )}

      </div>
    );
  }
}

AlertsTimeline.propTypes = {
  entries: React.PropTypes.instanceOf(List).isRequired,
  displayDefaultRange: React.PropTypes.bool.isRequired,
  dateRange: React.PropTypes.shape({
    startDate: React.PropTypes.instanceOf(Date).isRequired,
    startTime: React.PropTypes.instanceOf(Date),
    endDate: React.PropTypes.instanceOf(Date).isRequired,
    endTime: React.PropTypes.instanceOf(Date),
  }),
};

AlertsTimeline.defaultTypes = {
  dateRange: undefined,
};

export default AlertsTimeline;
