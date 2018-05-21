import React from 'react';
import styles from './styles.css';

const SummaryCard = (props) => {
  return (
    <div className={styles.infoSection}>
      <h3 className={styles.infoSectionTitle}>{props.title}</h3>
      <div className={styles.infoSectionValue}>{props.value}</div>
    </div>
  );
}

export default SummaryCard;
