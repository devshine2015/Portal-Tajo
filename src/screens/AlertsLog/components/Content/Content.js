import React from 'react';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import FixedContent from 'components/FixedContent';
import AnimatedLogo from 'components/animated';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import AlertsFilter from '../AlertsFilter/AlertsFilter';
import AlertsTimeline from '../AlertsTimeline/AlertsTimeline';
import classes from './classes';

class Content extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.isReady && nextProps.isReady) {
      this.getLogs(makePeriodForLast24Hours());
    }
  }

  getLogs = (range) => {
    this.props.fetchLogs(range);
  }

  canShowTimeline() {
    return this.props.isReady;
  }

  render() {
    return (
      <FixedContent containerClassName={css(classes.contentWrapper)}>
        <AlertsFilter onApply={this.getLogs} />

        { !this.canShowTimeline() ? <AnimatedLogo.FullscreenLogo /> : (
          <AlertsTimeline entries={this.props.entries} />
        )}

      </FixedContent>
    );
  }
}

Content.propTypes = {
  fetchLogs: React.PropTypes.func.isRequired,
  entries: React.PropTypes.instanceOf(List).isRequired,
  isReady: React.PropTypes.bool.isRequired,
};

export default Content;
