import React from 'react';
import PropTypes from 'prop-types';
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
        style={{ lineHeight: '60px' }}
        onClick={this.onClick}
      >
        {this.props.name}
      </div>
    );
  }
}

SimpleListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default pure(SimpleListItem);
