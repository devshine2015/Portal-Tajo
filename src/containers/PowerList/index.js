import React from 'react';
import pure from 'recompose/pure';
import { Tabs, Tab } from 'material-ui/Tabs';
import styles from './styles.css';
import ListBox from './components/ListBox';
import * as ListTypes from './types';


const PowerListContainer = ({
  children,
  setUpHooks,
  hooks,
}) => {
  const theTabs = children.map((aObj, idx) => (
        <Tab label={ListTypes.nameForType(aObj.listType)} key={idx}>
          <ListBox items={aObj.items}
            type={aObj.listType}
            hooks={hooks}
            setUpHooks={setUpHooks}
          />
        </Tab>
    ));

  return (
    <div className={styles.PowerListContainer}>
      <Tabs
        className={styles.FullHeight}
        contentContainerClassName={styles.FullHeightScroll}
      >
      { theTabs }
      </Tabs>
    </div>
  );
};

PowerListContainer.propTypes = {
  setUpHooks: React.PropTypes.func.isRequired,
  hooks: React.PropTypes.func.isRequired,
  children: React.PropTypes.array.isRequired,
};

export default pure(PowerListContainer);
