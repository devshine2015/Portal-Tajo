import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { selectOverviewVehicle } from 'containers/InnerPortal/components/OnePortal/actions';
import styles from './styles.css';

const selectVehicleImage = (name) => {
  const vehicleBrand = name.toLowerCase();
  switch (vehicleBrand) {
    case 'fuso':
    return (<img
      src={require('assets/images/demo/fuso2.png')}
      alt="vehicle"
    />);
    default:
    return (
      <img
        src={require('assets/images/demo/combined-shape.png')}
        alt="vehicle"
      />
    );
  }
};

const VehiclesList = (props) => {
  const onClick = (e) => {
    props.selectOverviewVehicle(props.selectedVehicle, e.target.dataset.vehicle);
  }

  const items = props.vehicles.map((item) => {
    return (
      <li className={styles.list__item} key={item.id} data-vehicle={item.id} onClick={onClick}>
        <div className={styles.listItemInn}>
            <div className={styles.imageWrapper}>
              { selectVehicleImage(item.original.make) }
            </div>
            <div className={styles.nameWrapper}>
              <h2>
                {item.original.name}
              </h2>
            </div>
            <div className={classnames(styles.selectedIndication, {
              [styles.selectedIndicationActive]: item.id === props.selectedVehicle})}
            ></div>
          </div>
      </li>
    );
  });
  return (
    <div className={classnames(styles.vehiclesSidebar, { [styles.vehiclesSidebarOpened]: props.visible })}>
      <h3 className={styles.sidebarTitle}>Vehicles</h3>
      <h5 className={styles.sidebarSubtitle}>ALL</h5>
      <div className={styles.listWrapper}>
        <ul className={styles.list}>
          {items}
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  selectOverviewVehicle: (prevVehicle, nextVehicle) => {
    if (prevVehicle !== nextVehicle) {
      return dispatch(selectOverviewVehicle(nextVehicle));
    }
    return dispatch(selectOverviewVehicle(null));
  },
});

export default connect(null, mapDispatchToProps)(VehiclesList);
