import React from 'react';
import pure from 'recompose/pure';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import formats from 'configs/dateFormats';

import styles from './styles.css';

function renderItems() {
  return formats.map(format => (
    <MenuItem
      key={format.value}
      value={format.value}
      primaryText={format.text}
    />
  ));
}

class DateFormatSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || formats[0].value,
    };
  }

  onChange = (e, key, value) => {
    this.setState({
      value,
    }, () => {
      this.props.onChange(e, key, value);
    });
  }
  render() {
    return (
      <div className={styles.selector}>
        <SelectField
          floatingLabelFixed
          floatingLabelText="Choose date format for the report"
          onChange={this.onChange}
          value={this.state.value}
        >
          { renderItems() }
        </SelectField>
      </div>
    );
  }
}

DateFormatSelector.propTypes = {
  defaultValue: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]),
  onChange: React.PropTypes.func.isRequired,
};

export default pure(DateFormatSelector);
