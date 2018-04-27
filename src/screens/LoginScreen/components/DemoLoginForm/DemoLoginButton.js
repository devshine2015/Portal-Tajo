import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const DemoLoginButton = (props) => {
  return (
    <button
      disabled={props.isLoading}
      type="submit"
      onClick={props.onClick}
      className={styles.loginButton}
    >LOGIN</button>
  );
};

DemoLoginButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DemoLoginButton;
