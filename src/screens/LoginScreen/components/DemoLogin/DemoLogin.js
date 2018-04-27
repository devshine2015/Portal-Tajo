import React from 'react';
import LoginForm from '../DemoLoginForm';
import Logos from './Logos';
import styles from './styles.css';

const DemoLogin = props => (
  <div className={styles.page}>
    <div className={styles.page__inn}>
      <div
        className={styles.page__content}
      >
        <Logos />
        <h1 className={styles.title}>DRVR</h1>
        <h2 className={styles.subtitle}>New generation of fleet management</h2>
        <LoginForm
          {...props}
        />
      </div>
    </div>
    {/* <DrvrFooter /> */}
  </div>
);

export default DemoLogin;
