import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const STYLES = {
  inputStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  },
};

class Filter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      previousValueLength: null,
    };
  }

  onFiltering = (e) => {
    const value = e.target.value.trim().toLowerCase();

    const isClearing = value.length < this.state.previousValueLength;
    this.props.filterFunc(value, isClearing);

    this.setState({
      previousValueLength: value.length,
    });
  }

  render() {
    return (
      <div className={styles.filterContainer}>
        <TextField
          fullWidth
          inputStyle={STYLES.inputStyle}
          hintStyle={STYLES.inputStyle}
          onChange={this.onFiltering}
          hintText={ this.props.translations.search_placeholder }
          underlineShow={false}
          defaultValue={this.props.defaultValue}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filterFunc: PropTypes.func.isRequired,

  defaultValue: PropTypes.string,

  translations: phrasesShape.isRequired,
};

Filter.defaultProps = {
  defaultValue: '',
};

const Pure = pure(Filter);

export default translate(phrases)(Pure);
