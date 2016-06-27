import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import TheMap from './../../components/Map';
import UnitsList from './../../components/UnitsList';

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
const PureMapAndList = pure(MapAndList);

export default PureMapAndList;
