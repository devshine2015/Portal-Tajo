import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';


class UnitsList extends React.Component {
  render() {
    return (
      <div className={styles.listBox}>
        <div > item 1 </div>
        <div > item 2 </div>
        <div > item 3 </div>
      </div>
    );
  }
}

const PureUnitsList = pure(UnitsList);

export default PureUnitsList;
