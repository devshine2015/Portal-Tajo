import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import RememberChoiceIcon from 'material-ui/svg-icons/action/lock';
import RememberChoiceIconOpen from 'material-ui/svg-icons/action/lock-open';
import DateFormatSelector from 'components/DateFormatSelector';
import { getUserSettings } from 'services/UserModel/reducer';
import { updateUserSettings } from 'services/UserModel/actions';
import dateFormats from 'configs/dateFormats';

import styles from './styles.css';

class DateFormatSelectorWithMemory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      haveToRemember: !!props.dateFormat || false,
      // some value from saved user settings
      chosenFormat: props.dateFormat || dateFormats.defaultFormat,
    };
  }

  onChooseDateFormat = (e, key, value) => {
    this.setState({
      chosenFormat: value,
      // reset checkbox if selected another format
      haveToRemember: value === this.props.dateFormat,
    });
  }

  onRemember = (e, isChecked) => {
    this.setState({
      haveToRemember: isChecked,
    }, () => {
      // save chosen format in localStorage
      this.props.updateUserSettings(isChecked, {
        dateFormat: this.state.chosenFormat,
      });
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <DateFormatSelector
          defaultFormat={this.state.chosenFormat}
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
  dateFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  updateUserSettings: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  dateFormat: getUserSettings(state).get('dateFormat'),
});
const mapDispatch = {
  updateUserSettings,
};

const PureDateFormatSelectorWithMemory = pure(DateFormatSelectorWithMemory);

export default connect(mapState, mapDispatch)(PureDateFormatSelectorWithMemory);
