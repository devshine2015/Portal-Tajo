import React from 'react';
import pure from 'recompose/pure';
import cs from 'classnames';
import { connect } from 'react-redux';
import { getDevicesAmount } from 'services/Devices/reducer';
import {
  getFaultVehiclesAmount,
  getNotAttachedAmount,
  getCurrentFilter,
} from '../../reducer';
import { filterActions } from '../../actions';

import styles from './styles.css';

class TotalLink extends React.Component {

  onClick = () => {
    this.props.onFilter(this.props.filterType);
  }

  render() {
    const { text, title, currentFilter, filterType } = this.props;
    const isZero = text === 0 || text === '0';
    const isCurrent = currentFilter === filterType;
    const filterClassName = cs(styles.total__filter, {
      [styles.total__filter_current]: isCurrent,
    });

    if (isZero || isCurrent) {
      return <span className={filterClassName}>{`${title}: ${text}`}</span>;
    }

    return (
      <span className={filterClassName}>
        {title}:&nbsp;
        <span
          className={styles.total__link}
          onClick={this.onClick}
        >
          {text}
        </span>
      </span>
    );
  }
}

TotalLink.propTypes = {
  onFilter: React.PropTypes.func.isRequired,
  text: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  currentFilter: React.PropTypes.string.isRequired,
  filterType: React.PropTypes.oneOf([
    'all', 'not-attached', 'fault-vehicle',
  ]).isRequired,
};

const Total = ({
  filterBy,
  totalDevices,
  currentFilter,
  totalFaultVehicles,
  totalNotAttached,
}) => (
  <div className={styles.total}>
    <TotalLink
      currentFilter={currentFilter}
      onFilter={filterBy}
      text={totalDevices}
      title="Total devices"
      filterType="all"
    />
    <TotalLink
      currentFilter={currentFilter}
      onFilter={filterBy}
      text={totalNotAttached}
      title="Not attached"
      filterType="not-attached"
    />
    <TotalLink
      currentFilter={currentFilter}
      onFilter={filterBy}
      text={totalFaultVehicles}
      title="Attached to wrong vehicle"
      filterType="fault-vehicle"
    />
  </div>
);

Total.propTypes = {
  filterBy: React.PropTypes.func.isRequired,
  totalDevices: React.PropTypes.number.isRequired,
  currentFilter: React.PropTypes.string.isRequired,
  totalNotAttached: React.PropTypes.number.isRequired,
  totalFaultVehicles: React.PropTypes.number.isRequired,
};

const mapState = state => ({
  totalDevices: getDevicesAmount(state),
  currentFilter: getCurrentFilter(state),
  totalNotAttached: getNotAttachedAmount(state),
  totalFaultVehicles: getFaultVehiclesAmount(state),
});
const mapDispatch = {
  filterBy: filterActions.filterBy,
};

const PureTotal = pure(Total);

export default connect(mapState, mapDispatch)(PureTotal);
