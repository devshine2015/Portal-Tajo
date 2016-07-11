import React from 'react';
import pure from 'recompose/pure';
import ListItem from './../ListItem';
import styles from './styles.css';


class ListBox extends React.Component {
  render() {
    return (
      <div className={styles.listBox}>
        <ListItem title= { this.props.title + " 01"} />
        <ListItem title= { this.props.title + " 02"} />
        <ListItem title= { this.props.title + " 03"} />
        <ListItem title= { this.props.title + " 04"} />
        <ListItem title= { this.props.title + " 05"} />
        <ListItem title= { this.props.title + " 06"} />
        <ListItem title= { this.props.title + " 07"} />
      </div>
    );
  }
}

ListBox.propTypes = {
  title: React.PropTypes.string,
};

const PureListBox = pure(ListBox);

export default PureListBox;
