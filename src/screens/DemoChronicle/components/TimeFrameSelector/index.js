import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { DateRange } from 'components/DateRange';
import { setChronicleTimeFrame } from './../../actions';
import { getChronicleTimeFrame } from './../../reducer';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

class TimeFrame extends React.Component {

  onTimeFrameChange = (fromDateTime, toDateTime) => {
    this.props.setChronicleTimeFrame(fromDateTime, toDateTime);
  }

  render() {
    const dateFrom = this.props.chronicleTimeFrame.fromDate;
    const dateTo = this.props.chronicleTimeFrame.toDate;
    return (
      <div className={styles.timeFrameBox}>
        <DateRange
          onChange={this.onTimeFrameChange}
          fromDate={dateFrom}
          toDate={dateTo}
          withTime
        />
      </div>
    );
  }
}

TimeFrame.propTypes = {
  setChronicleTimeFrame: PropTypes.func.isRequired,
  chronicleTimeFrame: PropTypes.object.isRequired,

  translations: phrasesShape.isRequired,
};

const mapState = state => ({
  chronicleTimeFrame: getChronicleTimeFrame(state),
});

const mapDispatch = {
  setChronicleTimeFrame,
};

const PureTimeFrame = pure(TimeFrame);
const Connected = connect(mapState, mapDispatch)(PureTimeFrame);

export default translate(phrases)(Connected);
