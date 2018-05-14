import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { selectOverviewVehicle } from 'containers/InnerPortal/components/DemoPortal/actions';
import styles from './styles.css';


const VehiclesList = (props) => {
  const onClick = (e) => {
    props.selectOverviewVehicle(props.selectedVehicle, e.target.dataset.vehicle);
  }
  const items = props.vehicles.map((item) => {
    return (
      <li className={styles.list__item} key={item.id} data-vehicle={item.id} onClick={onClick}>
        <div className={styles.listItemInn}>
            <div className={styles.imageWrapper}>
              <img
                src={require('assets/images/demo/combined-shape.png')}
                alt="vehicle"
              />
            </div>
            <div className={styles.nameWrapper}>
              <h2>
                {item.original.name}
              </h2>
              <span className={styles.trips}>{item.original.trips} trips</span>
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
      <ul className={styles.list}>
        {items}
      </ul>
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
