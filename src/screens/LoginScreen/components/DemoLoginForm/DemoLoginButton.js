import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const DemoLoginButton = (props) => {
  return (
    <button
      type="submit"
      onClick={props.onClick}
      className={styles.loginButton}
    >
      LOGIN { !props.isLoading ? '' : (
        <div className={styles.spinner}>
          <div className={styles.doubleBounce1}></div>
          <div className={styles.doubleBounce2}></div>
        </div>
      )
}
    </button>
  );
};

DemoLoginButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DemoLoginButton;
