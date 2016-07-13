import React from 'react';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';
// import { connect } from 'react-redux';
import ListBox from './components/ListBox';
import styles from './styles.css';
// import { getFleetData } from 'services/FleetModel/reducer';

class PowerListContainer extends React.Component {
  render() {
    return (
        <div className={styles.PoverListContainer}>
        <Tabs
          className={styles.FullHeight}
          contentContainerClassName={styles.FullHeightScroll}
        >
          <Tab label="Vehicles" >
            <ListBox title="CAR" />
          </Tab>
          <Tab label="Locations" >
            <ListBox title="GF" />
          </Tab>
          <Tab label="Drivers" >
            <ListBox title="DRIVER" />
          </Tab>
        </Tabs>
        </div>
      );
  }
}

const PurePowerListContainer = pure(PowerListContainer);
export default PurePowerListContainer;
