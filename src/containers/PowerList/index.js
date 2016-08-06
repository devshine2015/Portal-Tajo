import React from 'react';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';
// import { connect } from 'react-redux';
import styles from './styles.css';
import ListBox from './components/ListBox';
import * as ListTypes from './types';
// import { getFleetData } from 'services/FleetModel/reducer';


class PowerListContainer extends React.Component {

  render() {
    const theTabs = this.props.children.map((aObj, idx) => (
          <Tab label={ListTypes.nameForType(aObj.listType)} key={idx}>
            <ListBox items={aObj.items}
              type={aObj.listType}
              hooks={this.props.hooks}
              setUpHooks={this.props.setUpHooks}
            />
          </Tab>
      ));

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
  setUpHooks: React.PropTypes.func.isRequired,
  hooks: React.PropTypes.func.isRequired,
  children: React.PropTypes.array.isRequired,
};

const PurePowerListContainer = pure(PowerListContainer);
export default PurePowerListContainer;
