import React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import FixedContent from 'components/FixedContent';
import { logActions } from 'services/AlertsSystem/actions';
import { getLogsSlice } from 'services/AlertsSystem/reducer';
import { getLogEntries } from 'services/AlertsSystem/selectors';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import AlertsFilter from '../AlertsFilter/AlertsFilter';
import AlertsTimeline from '../AlertsTimeline/AlertsTimeline';
import classes from './classes';

class Content extends React.Component {

  componentDidMount() {
    this.getLogs(makePeriodForLast24Hours());
  }

  getLogs = (range) => {
    this.props.fetchLogs(range);
  }

  render() {
    return (
      <FixedContent containerClassName={css(classes.contentWrapper)}>
        <AlertsFilter onApply={this.getLogs} />
        <AlertsTimeline entries={this.props.entries} />
      </FixedContent>
    );
  }
}

Content.propTypes = {
  fetchLogs: React.PropTypes.func.isRequired,
  entries: React.PropTypes.instanceOf(List).isRequired,
};

const makeMapStateToProps = () => {
  const getLogs = getLogEntries();

  const mapStateToProps = state => ({
    entries: getLogs(getLogsSlice(state)),
  });

  return mapStateToProps;
};

const mapDispatch = {
  fetchLogs: logActions.fetchLogs,
};

export default connect(makeMapStateToProps, mapDispatch)(Content);
