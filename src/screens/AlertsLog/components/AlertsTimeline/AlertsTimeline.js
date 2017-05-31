import React from 'react';
import moment from 'moment';
import { List } from 'immutable';
import { css } from 'aphrodite/no-important';
import { ALERT_KINDS } from 'services/AlertsSystem/alertKinds';
import LogsFilter from '../KindsFilter/KindsFilter';
import TimelineHeader from './TimelineHeader';
import TimelineEvent from './TimelineEvent';
import classes from './AlertsTimeline.classes';

const EmptyTimeline = () => (
  <div className={css([classes.listWrapper, classes.listWrapper_empty])}>
    No events for specified period
  </div>
);

function _makeHeaderTimeRange(range = {}) {
  const format = 'DD-MM-YYYY HH:mm';

  return {
    from: moment(range.fromDate).format(format),
    to: moment(range.toDate).format(format),
  };
}

function makeFilterFromKinds() {
  return new List(ALERT_KINDS).map(kind => kind.value);
}

class AlertsTimeline extends React.Component {

  constructor(props) {
    super(props);

    const filterKinds = makeFilterFromKinds();

    this.totalFiltersAmount = filterKinds.length;

    this.state = {
      activeKinds: filterKinds,
    };
  }

  /**
   * Update local state of active filters.
   * Filters array is immutable.
   *
   * @param {String} nextKind - one of available alerts kinds
   */
  onFilterKindsChange = (nextKind) => {
    const filterIndex = this.state.activeKinds.indexOf(nextKind);
    const nextFilters = this.state.activeKinds.update((list) => {
      if (filterIndex !== -1) return list.delete(filterIndex);

      return list.push(nextKind);
    });

    this.setState({
      activeKinds: nextFilters,
    });
  }

  filterEvents = event => this.state.activeKinds.indexOf(event.get('eventKind')) !== -1;

  renderEvents() {
    return this.props.entries.filter(this.filterEvents).map(event => (
      <TimelineEvent
        {...event.toJS()}
        key={event.get('id')}
      />
    ));
  }

  render() {
    const range = _makeHeaderTimeRange(this.props.dateRange);
    const isFilterActive = this.state.activeKinds.size !== this.totalFiltersAmount;
    const entries = this.renderEvents();

    return (
      <div className={css(classes.wrapper)}>
        <TimelineHeader
          dateRange={range}
          isDefaultRange={this.props.displayDefaultRange}
          totalAmount={this.props.entries.size}
          isFiltered={isFilterActive}
          filteredAmount={entries.size}
          selectedVehicleName={this.props.selectedVehicleName}
        />

        { this.props.entries.size !== 0 && (
          <LogsFilter
            onKindsChange={this.onFilterKindsChange}
            activeFilters={this.state.activeKinds}
            containerClassName={css(classes.filter)}
            labelClassName={css(classes.filter__label)}
          />
        )}

        { this.props.entries.size === 0 ? <EmptyTimeline /> : (
          <div className={css(classes.listWrapper)}>
            { entries }
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
    fromDate: React.PropTypes.instanceOf(Date).isRequired,
    toDate: React.PropTypes.instanceOf(Date).isRequired,
  }),
  selectedVehicleName: React.PropTypes.string,
};

AlertsTimeline.defaultTypes = {
  dateRange: undefined,
  selectedVehicleName: undefined,
};

export default AlertsTimeline;
