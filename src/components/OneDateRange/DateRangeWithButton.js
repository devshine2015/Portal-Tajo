import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { DateRange } from 'components/OneDateRange';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import NoPrint from 'components/NoPrint/NoPrint';
import styles from './styles.css';

class DateRangeWithButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: props.fromDate,
      toDate: props.toDate,
    };
  }

  onDateTimeChange = (newFromDate, newToDate) => {
    this.setState({
      fromDate: newFromDate,
      toDate: newToDate,
    });
  }

  onFilterClick = () => {
    // do custom logic with date range
    this.props.onApply(this.state);
  }

  render() {
    const { onApply, button, ...rest } = this.props;
    const btn = React.cloneElement(button, {
      onClick: this.onFilterClick,
    });

    return (
      <div className={styles.filter__wrapper}>
        <DateRange
          onChange={this.onDateTimeChange}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          {...rest}
        />
        <NoPrint>
          { btn }
        </NoPrint>
      </div>
    );
  }
}

DateRangeWithButton.propTypes = {
  onApply: PropTypes.func.isRequired,
  button: PropTypes.element.isRequired,
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
};

DateRangeWithButton.defaultProps = {
  ...makePeriodForLast24Hours(),
};

export default DateRangeWithButton;
