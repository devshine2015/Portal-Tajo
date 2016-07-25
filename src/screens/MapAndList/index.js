import React from 'react';
import pure from 'recompose/pure';
import styles from './styles.css';
import InnerPortal from 'containers/InnerPortal';
import SplitContainer from 'containers/SplitContainer';
// import TheMap from 'components/Map';
import PowerListContainer from 'components/PowerListContainer';
import PowerListBox from 'components/PowerListContainer/components/ListBox/';
import { connect } from 'react-redux';
import * as fromFleetReducer from 'services/FleetModel/reducer';


class MapAndList extends React.Component {
  render() {
    return (
      <InnerPortal>
      <div className={styles.mapAndListContainer}>
        <PowerListContainer >
        { [{ title: 'Vehicles', element: <PowerListBox title="CAR" items={this.props.vehicles} /> },
          { title: 'Locations', element: <PowerListBox title="GF" items={this.props.locations} /> },
          { title: 'Drvrs', element: <PowerListBox title="DRIVER" items={this.props.vehicles} /> }] }
        </PowerListContainer>
        <SplitContainer />
      </div>
      </InnerPortal>
    );
  }
}

// const PureMapAndList = pure(MapAndList);
// export default PureMapAndList;

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
  locations: fromFleetReducer.getLocations(state),
});

MapAndList.propTypes = {
  vehicles: React.PropTypes.object.isRequired,
  locations: React.PropTypes.object.isRequired,
};

const PureMapAndList = pure(MapAndList);

export default connect(mapState)(PureMapAndList);
