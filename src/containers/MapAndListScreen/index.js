import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';


class MapAndList extends React.Component {
  render() {
    return (
      <div className={styles.mapAndListContainer}>
       THE map goes HERE
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   children: React.PropTypes.node,
//   fleet: React.PropTypes.string.isRequired,
//   logout: React.PropTypes.func.isRequired,
// };

const PureMapAndList = pure(MapAndList);

export default PureMapAndList;
