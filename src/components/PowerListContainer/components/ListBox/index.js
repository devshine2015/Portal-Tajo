import React from 'react';
import pure from 'recompose/pure';
import ListItem from './../ListItem';
import PowerFilter from './../PowerFilter';
import styles from './styles.css';

//        <PowerFilter />


class ListBox extends React.Component {
  render() {
    if (this.props.items.size === 0) {
      return null;
    }

    const items = this.props.items.map((v) => (
      <li key={v.id}>
        <ListItem title= { v.name} />
      </li>
    ));
    return (
      <div className={styles.listBoxTopContainer}>
        <PowerFilter />
        <ul className={styles.listBoxList}>
          {items}
        </ul>
      </div>
    );
  }
}

ListBox.propTypes = {
  items: React.PropTypes.array.isRequired,
};

const PureListBox = pure(ListBox);

export default PureListBox;
