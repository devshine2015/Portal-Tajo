import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import RememberChoiceIcon from 'material-ui/svg-icons/action/lock';
import RememberChoiceIconOpen from 'material-ui/svg-icons/action/lock-open';
import DateFormatSelector from 'components/DateFormatSelector';
import { updateUserSettings } from 'services/UserModel/actions';

import styles from './styles.css';

class DateFormatSelectorWithMemory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      haveToRemember: props.userDateFormat === props.tempDateFormat,
      // some value from saved user settings
      // chosenFormat: props.dateFormat,
    };
  }

  onChooseDateFormat = (e, key, value) => {
    this.setState({
      // chosenFormat: value,
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
    return (
      <div className={styles.wrapper}>
        <DateFormatSelector
          defaultFormat={this.props.userDateFormat}
          onChange={this.onChooseDateFormat}
        />
        <Checkbox
          checked={this.state.haveToRemember}
          label="Remember my choice"
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
  ]),
  updateUserSettings: React.PropTypes.func.isRequired,
  onFormatChange: React.PropTypes.func.isRequired,
};

const mapState = null;
const mapDispatch = {
  updateUserSettings,
};

const PureDateFormatSelectorWithMemory = pure(DateFormatSelectorWithMemory);

export default connect(mapState, mapDispatch)(PureDateFormatSelectorWithMemory);
