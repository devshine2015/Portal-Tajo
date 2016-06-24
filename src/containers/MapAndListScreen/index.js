import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import TheMap from './../Map';
import UnitsList from './../UnitsList';


// const dbgFooterStyle = {
//   width: '100%',
//   backgroundColor: 'orange',
//   position: 'absolute',
//   bottom: '0px',
// };
// THE map goes HERE
// <div style={dbgFooterStyle}>
// BOTTOM
// </div>

class MapAndList extends React.Component {
  render() {
    return (
      <div className={styles.mapAndListContainer}>
      <UnitsList />
      <TheMap />
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
