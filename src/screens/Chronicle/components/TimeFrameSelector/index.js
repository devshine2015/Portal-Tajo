import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { setChronicleTimeFrame } from './../../actions';
import { getChronicleTimeFrame } from './../../reducer';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

class TimeFrame extends React.Component {

  fromDateChange = (event, date) => {
    const toDate = moment(date).add(1, 'days').toDate();
    this.props.setChronicleTimeFrame(date, toDate);
  };

  render() {
    const fromDate = this.props.chronicleTimeFrame.fromDate;
    return (
      <div className={styles.timeFrameBox}>
        <div className={styles.picker}>
          <DatePicker
            autoOk
            hintText="Controlled Date Input"
            value={fromDate}
            onChange={this.fromDateChange}
            maxDate={new Date()}
          />
        </div>

        <div className={styles.tipTextContainer}>
          <ArrowIcon
            color={'#accad8'}
            hoverColor={'#accad8'}
            style={{ fontSize: '32px' }}
          />
          { this.props.translations.select_date_text }
        </div>

      </div>
    );
  }
}

TimeFrame.propTypes = {
  setChronicleTimeFrame: React.PropTypes.func.isRequired,
  chronicleTimeFrame: React.PropTypes.object.isRequired,

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
