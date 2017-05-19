import React from 'react';
import pure from 'recompose/pure';
import DatePicker from 'material-ui/DatePicker';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
// import { setChronicleTimeFrame } from './../../actions';
// import { getChronicleTimeFrame } from './../../reducer';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

class TimeFrame extends React.Component {

  onDateChange = (event, date) => {
    this.props.onChange(date);
    this.setState({ date });
    // const toDate = moment(date).add(1, 'days').toDate();
    // this.props.setChronicleTimeFrame(date, toDate);
  };

  render() {
    return (
      <div className={styles.timeFrameBox}>
        <div className={styles.picker}>
          <DatePicker
            autoOk
            hintText="Controlled Date Input"
            value={this.props.dateValue}
            onChange={this.onDateChange}
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
        {/*<div className={styles.betaContainer}>
          <span> {'beta version'} </span>
        </div>*/}
      </div>
    );
  }
}

TimeFrame.propTypes = {
  dateValue: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  // chronicleTimeFrame: React.PropTypes.object.isRequired,

  translations: phrasesShape.isRequired,
};

const PureTimeFrame = pure(TimeFrame);

export default translate(phrases)(PureTimeFrame);
