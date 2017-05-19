import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import RememberChoiceIcon from 'material-ui/svg-icons/action/lock';
import RememberChoiceIconOpen from 'material-ui/svg-icons/action/lock-open';
import DateFormatSelector from 'components/DateFormatSelector';
import { updateUserSettings } from 'services/Session/actions';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

/**
 * Here we face little subtle behaviour.
 * ReportConfigurator has 3 sources for dataFormat
 * to choose from for using:
 * - localStorage (if user save it previously)
 * - settings from services/UserModel (where value from localStorage are cached)
 * - temporary format from ReportConfigurator' state
 *
 * userDateFormat is coming from localStorage or user settings
 * and changes only if user updates settings. Used for detect if
 * user chose same format as saved in settings/localStorage.
 *
 * tempDateFormat is coming from DateFormatSelector onChange handler
 * and reflect current selected format
 **/

class DateFormatSelectorWithMemory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      haveToRemember: props.userDateFormat === props.tempDateFormat,
    };
  }

  onChooseDateFormat = (e, key, value) => {
    this.setState({
      // reset checkbox if selected another format
      haveToRemember: value === this.props.userDateFormat,
    }, () => {
      this.props.onFormatChange(value);
    });
  }

  onRemember = (e, isChecked) => {
    this.setState({
      haveToRemember: isChecked,
    }, () => {
      // save chosen format in localStorage
      this.props.updateUserSettings(isChecked, {
        dateFormat: this.props.tempDateFormat,
      });
    });
  }

  render() {
    const { translations } = this.props;
    const rememberText = this.state.haveToRemember ?
      translations.forget_choice :
      translations.remember_choice;

    return (
      <div className={styles.wrapper}>
        <DateFormatSelector
          defaultFormat={this.props.userDateFormat || this.props.tempDateFormat}
          onChange={this.onChooseDateFormat}
        />
        <Checkbox
          checked={this.state.haveToRemember}
          label={rememberText}
          checkedIcon={<RememberChoiceIcon />}
          uncheckedIcon={<RememberChoiceIconOpen />}
          onCheck={this.onRemember}
        />
      </div>
    );
  }
}

DateFormatSelectorWithMemory.propTypes = {
  userDateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  tempDateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]).isRequired,
  updateUserSettings: React.PropTypes.func.isRequired,
  onFormatChange: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

DateFormatSelectorWithMemory.defaultProps = {
  translations: phrases,
  userDateFormat: 'dd-mm-yyyy',
};

const mapState = null;
const mapDispatch = {
  updateUserSettings,
};

const PureDateFormatSelectorWithMemory = pure(DateFormatSelectorWithMemory);
const Connected = connect(mapState, mapDispatch)(PureDateFormatSelectorWithMemory);

export default translate(phrases)(Connected);
