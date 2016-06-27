import React from 'react';
import pure from 'recompose/pure';
import ListItem from './components/ListItem';
import styles from './styles.css';


class UnitsList extends React.Component {
  render() {
    return (
      <div className={styles.listBox}>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    );
  }
}

const PureUnitsList = pure(UnitsList);

export default PureUnitsList;
