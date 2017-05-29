import React from 'react';
import { css } from 'aphrodite/no-important';
import FlatButton from 'material-ui/FlatButton';
import DateRange from 'components/DateRange/DateRange';
import Layout from 'components/Layout';
import { makePeriodForLast24Hours } from 'utils/dateTimeUtils';
import TypesFilter from '../TypesFilter/TypesFilter';
import classes from './classes';

const STYLES = {
  applyBtn: {
    marginLeft: 10,
  },
};

class Filter extends React.Component {
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
        <Layout.Row>
          <DateRange
            onChange={this.onDateTimeChange}
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            withTime
          />
        </Layout.Row>

        <Layout.Row>
          <TypesFilter />
        </Layout.Row>

        <Layout.Row className={css(classes.buttonsWrapper)}>
          <FlatButton
            primary
            label="Apply"
            style={STYLES.applyBtn}
            onClick={this.onFilterClick}
          />
        </Layout.Row>
      </div>
    );
  }
}

Filter.propTypes = {
  onApply: React.PropTypes.func.isRequired,
};

export default Filter;
