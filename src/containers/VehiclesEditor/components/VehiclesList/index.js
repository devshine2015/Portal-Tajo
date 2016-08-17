import React from 'react';
import pure from 'recompose/pure';
import VehiclesListItem from '../VehiclesListItem';

import styles from './styles.css';

const VehiclesList = ({
  vehicles,
  onItemClick,
}) => {
  const items = vehicles.map(v => (
    <li key={v.id}>
      <VehiclesListItem
        {...v}
        onClick={onItemClick}
      />
    </li>
  ));

  return (
    <ul className={styles.list}>
      {items}
    </ul>
  );
};

VehiclesList.propTypes = {
  onItemClick: React.PropTypes.func.isRequired,
  vehicles: React.PropTypes.object.isRequired,
};

export default pure(VehiclesList);
