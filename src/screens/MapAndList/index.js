import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'components/Map';
import PowerListContainer from 'components/PowerListContainer';
// import UnitsList from './../../components/UnitsList';

class MapAndList extends React.Component {
  render() {
    return (
      <InnerPortal>
      <div className={styles.mapAndListContainer}>
        <PowerListContainer />
        <SplitContainer />
      </div>
      </InnerPortal>
    );
  }
}

const PureMapAndList = pure(MapAndList);

export default PureMapAndList;
