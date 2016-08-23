import React from 'react';
import pure from 'recompose/pure';

import styles from '../styles.css';

class SimpleListItem extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div
        className={styles.listItemInn}
        onClick={this.onClick}
      >
        {this.props.name}
      </div>
    );
  }
}

SimpleListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default pure(SimpleListItem);
