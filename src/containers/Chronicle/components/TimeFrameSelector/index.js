import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { setChronicleTimeFrame } from './../../actions';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

class TimeFrame extends React.Component {

  constructor(props) {
    super(props);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.state = {
      fromDate: yesterday,
    };

//    this.onChange = this.onChange.bind(this);
  }

  fromDateChange = (event, date) => {
    this.setState({
      fromDate: date,
    });
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 1);
    this.props.setChronicleTimeFrame(date, toDate);
  };

  render() {
    return (
      <div className={styles.timeFrameBox}>
        <div className={styles.picker}>
          <DatePicker
            autoOk
            hintText="Controlled Date Input"
            value={this.state.fromDate}
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

  translations: phrasesShape.isRequired,
};

const mapState = null;
const mapDispatch = {
  setChronicleTimeFrame,
};

const PureTimeFrame = pure(TimeFrame);
const Connected = connect(mapState, mapDispatch)(PureTimeFrame);

export default translate(phrases)(Connected);
