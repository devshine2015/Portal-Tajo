import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import styles from './styles.css';


class UnitsList extends React.Component {
  render() {
    const listClassName = classnames(styles.listBox);
    return (
      <div>
        <div className={listClassName}> THE map goes HERE </div>
      </div>
    );
  }
}

const PureUnitsList = pure(UnitsList);

export default PureUnitsList;
