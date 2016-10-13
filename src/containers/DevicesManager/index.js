import React from 'react';
import pure from 'recompose/pure';
import DevicesList from './components/DevicesList';

import styles from './styles.css';

const DevicesManager = () => (
  <div className={styles.managerContainer}>
    <DevicesList />
  </div>
);

DevicesManager.propTypes = {};

export default pure(DevicesManager);
