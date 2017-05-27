import React from 'react';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import DateRange from 'components/DateRange/DateRange';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import classes from './classes';

const STYLES = {
  applyBtn: {
    marginLeft: 10,
  },
};

class AlertsFilter extends React.Component {
  constructor(props) {
    super(props);

    const { fromDate, toDate } = makePeriodForLast24Hours();

    this.state = { fromDate, toDate };
  }

  onDateTimeChange = (newFromDate, newToDate) => {
    this.setState({
      fromDate: newFromDate,
      toDate: newToDate,
    });
  }

  onFilterClick = () => {
    this.props.onApply(this.state);
  }

  render() {
    return (
      <div className={css(classes.filter)}>
        <DateRange
          onChange={this.onDateTimeChange}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          withTime
        />
        <FlatButton
          primary
          label="Apply"
          style={STYLES.applyBtn}
          onClick={this.onFilterClick}
        />
      </div>
    );
  }
}

AlertsFilter.propTypes = {
  onApply: React.PropTypes.func.isRequired,
};

export default AlertsFilter;
