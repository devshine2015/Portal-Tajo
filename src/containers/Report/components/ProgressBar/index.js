import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import styles from './styles.css';

const ProgressBar = () => (
  <div className={styles.progress}>
    <LinearProgress mode="indeterminate" />
  </div>
);

export default ProgressBar;
