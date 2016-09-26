import React from 'react';
import pure from 'recompose/pure';
import Checkbox from 'material-ui/Checkbox';
import RememberChoiceIcon from 'material-ui/svg-icons/action/lock';
import RememberChoiceIconOpen from 'material-ui/svg-icons/action/lock-open';
import DateFormatSelector from 'components/DateFormatSelector';

import styles from './styles.css';

class DateFormatSelectorWithMemory extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      haveToRemember: false,
      // some value from saved user settings or default value
      chosenFormat: props.dateFormat || 'yyyy-mm-dd',
    };
  }

  onChooseDateFormat = (e, key, value) => {
    this.setState({
      chosenFormat: value,
    });
  }

  onRemember = (e, isChecked) => {
    this.setState({
      haveToRemember: isChecked,
    }, () => {
      // perform remember action
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <DateFormatSelector
          defaultValue={this.state.chosenFormat}
          onChange={this.onChooseDateFormat}
        />
        <Checkbox
          checked={this.state.haveToRemember}
          label="Remember choice"
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
};

export default pure(DateFormatSelectorWithMemory);
