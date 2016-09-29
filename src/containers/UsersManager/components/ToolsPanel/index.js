import React from 'react';
import pure from 'recompose/pure';
import GroupBy from '../GroupBy';

import styles from './styles.css';

const ToolsPanel = () => (
  <div className={styles.wrapper}>
    <GroupBy />
  </div>
);

ToolsPanel.propTypes = {};

export default pure(ToolsPanel);
