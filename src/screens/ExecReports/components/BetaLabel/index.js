import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';

const BetaLabel = () => (
  <div className={styles.betaContainer}>
    <span >
    beta
    </span>
  </div>
);


export default pure(BetaLabel);
