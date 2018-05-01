import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import classnames from 'classnames';

import styles from './styles.css';

const FixedContent = ({
  children,
  containerClassName,
}) => {
  return (
    <div className={styles.fixedContent}>
      {children}
    </div>
  );
};

FixedContent.propTypes = {
  children: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
  style: PropTypes.object,
};

FixedContent.defaultProps = {
  containerClassName: '',
  style: undefined,
};

export default pure(FixedContent);
