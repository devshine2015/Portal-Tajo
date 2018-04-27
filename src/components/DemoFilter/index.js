import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { translate } from 'utils/i18n';
import phrases, { phrasesShape } from './PropTypes';
import styles from './styles.css';

class DemoFilter extends React.Component {
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
        {/* icon */}
        <input
          type="text"
          placeholder="Search vehicle ..."
          className={styles.inputStyle}
          onChange={this.onFiltering}
        />
      </div>
    );
  }
}

DemoFilter.propTypes = {
  filterFunc: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  translations: phrasesShape.isRequired,
};

DemoFilter.defaultProps = {
  defaultValue: '',
};

export default translate(phrases)(DemoFilter);
