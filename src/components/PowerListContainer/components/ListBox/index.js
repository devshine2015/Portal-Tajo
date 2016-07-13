import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import ListItem from './../ListItem';
import PowerFilter from './../PowerFilter';
import styles from './styles.css';

//        <PowerFilter />


class ListBox extends React.Component {
  render() {
    return (
      <div className={styles.listBoxTopContainer}>
        <div className={styles.listBoxList}>
          <ListItem title= { this.props.title + " 01"} />
          <ListItem title= { this.props.title + " 02"} />
          <ListItem title= { this.props.title + " 03"} />
          <ListItem title= { this.props.title + " 04"} />
          <ListItem title= { this.props.title + " 05"} />
          <ListItem title= { this.props.title + " 06"} />
          <ListItem title= { this.props.title + " 07"} />
        </div>
      </div>
    );
  }
}

const PureListBox = pure(ListBox);

export default PureListBox;
