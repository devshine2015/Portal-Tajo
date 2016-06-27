import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';


class ListItem extends React.Component {
  render() {
    return (
      <div className={styles.listItem}>
        <div > VEHICLE </div>
      </div>
    );
  }
}

const PureListItem = pure(ListItem);

export default PureListItem;
