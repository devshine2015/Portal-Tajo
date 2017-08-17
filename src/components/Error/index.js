import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'utils/i18n';

import styles from './styles.css';
import phrases, { phrasesShape } from './PropTypes';

const Err = ({
  type,
  color,
  translations,
}) => (
  <div style={{ color }} className={styles.error}>
    { translations[type] }
  </div>
);

Err.propTypes = {
  type: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,

  translations: phrasesShape.isRequired,
};

Err.defaultProps = {
  color: 'red',
  translations: phrases,
};

export default translate()(Err);
