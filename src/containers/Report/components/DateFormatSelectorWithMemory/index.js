import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import RememberChoiceIcon from 'material-ui/svg-icons/action/lock';
import RememberChoiceIconOpen from 'material-ui/svg-icons/action/lock-open';
import DateFormatSelector from 'components/DateFormatSelector';
import { updateUserSettings } from 'services/UserModel/actions';

import styles from './styles.css';

const REMEMBER_ME = 'Remember my choice';
const FORGET_ME = 'Forget my choice';

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
    const rememberText = this.state.haveToRemember ? FORGET_ME : REMEMBER_ME;

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
};

const mapState = null;
const mapDispatch = {
  updateUserSettings,
};

const PureDateFormatSelectorWithMemory = pure(DateFormatSelectorWithMemory);

export default connect(mapState, mapDispatch)(PureDateFormatSelectorWithMemory);
