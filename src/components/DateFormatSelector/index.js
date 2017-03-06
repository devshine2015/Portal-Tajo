import React from 'react';
import pure from 'recompose/pure';
import {
  SelectField,
  MenuItem,
} from 'material-ui';
import dateFormats from 'configs/dateFormats';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './phrases.lang';

function renderItems() {
  return dateFormats.formats.map(format => (
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
      value: props.defaultFormat,
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
          floatingLabelText={ this.props.translations.choose_date_format }
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
  defaultFormat: React.PropTypes.oneOf([
    'yyyy-mm-dd', 'dd-mm-yyyy',
  ]).isRequired,
  onChange: React.PropTypes.func.isRequired,

  translations: phrasesShape,
};

export default pure(translate(phrases)(DateFormatSelector));
