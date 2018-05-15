import React from 'react';
import PropTypes from 'prop-types';
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
        <span className={styles.searchIcon}>
          <svg width="19" height="19" viewBox="0 0 19 19">
              <path fill="#AAA" fillRule="evenodd" d="M5.888 14.331l-4.45 4.47-1.39-1.396 4.45-4.47A7.596 7.596 0 0 1 2.93 8.3c0-4.201 3.39-7.607 7.571-7.607 4.181 0 7.57 3.406 7.57 7.607 0 4.2-3.389 7.606-7.57 7.606a7.515 7.515 0 0 1-4.613-1.575zM10.5 2.866C7.514 2.866 5.093 5.3 5.093 8.3c0 3 2.421 5.433 5.408 5.433 2.987 0 5.408-2.433 5.408-5.433 0-3.001-2.421-5.434-5.408-5.434z"/>
          </svg>
        </span>
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
