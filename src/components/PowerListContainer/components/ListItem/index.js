import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';


class ListItem extends React.Component {
  render() {
    return (
      <div className={styles.listItem}>
        <div > {this.props.title} </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  title: React.PropTypes.string,
};


const PureListItem = pure(ListItem);

export default PureListItem;
