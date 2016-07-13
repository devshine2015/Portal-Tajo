import React from 'react';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';
// import { connect } from 'react-redux';
import ListBox from './components/ListBox';
import styles from './styles.css';
// import { getFleetData } from 'services/FleetModel/reducer';

class PowerListContainer extends React.Component {

  render() {
    const theTabs = this.props.children.map((aObj, idx) => {
      return (
          <Tab label={aObj.title} key={idx}>
            {aObj.element}
          </Tab>
      );
    });

    return (
        <div className={styles.PoverListContainer}>
          <Tabs
            className={styles.FullHeight}
            contentContainerClassName={styles.FullHeightScroll}
          >
          { theTabs }
          </Tabs>
        </div>
      );
  }
}

PowerListContainer.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const PurePowerListContainer = pure(PowerListContainer);
export default PurePowerListContainer;
