import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import pure from 'recompose/pure';

import CustomControls from './components/CustomControls';

import { createMapboxMap } from 'utils/mapBoxMap';
import { ifArraysEqual } from 'utils/arrays';

import { mapStoreSetView, mapStoreGetView, mapStoreGetPan } from './reducerAction';

import styles from './styles.css';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.theMap = null;
    this.mappp = null;
    this.latestPan = [];
  }

  componentDidMount() {
    this.createMapboxMap();
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.mappp === null;
  // }

  componentWillUnmount() {
    // TODO: need to shutdown the mapbox object?
    this.props.mapStoreSetView(this.theMap.getCenter(), this.theMap.getZoom());
  }

  createMapboxMap() {
    // if already existing
    if (this.theMap !== null) {
      return;
    }
    this.theMap = createMapboxMap(ReactDOM.findDOMNode(this),
      this.props.mapStoredView,
      null
      // contextMenuAddGFItems(this.props.gfEditUpdate,
      //   this.routeSelectedVechicleToLatLng,
      //   this.nearestVechicleToLatLng)
        // (isMwa ? this.nearestVechicleToLatLng : null))
    );
  }

  applyPan() {
    if (this.props.mapStoredPan !== null
        && (this.latestPan === null
            || !ifArraysEqual(this.props.mapStoredPan, this.latestPan))) {
      this.theMap.panInsideBounds(window.L.latLngBounds(this.props.mapStoredPan));
    }
    this.latestPan = this.props.mapStoredPan;
  }

  mapifyChildren() {
    return React.Children.map(this.props.children, child => React.cloneElement(child, {
      theMap: this.theMap,
    }));
    // {
    //   if (child.type === MapGF)
    //     return React.cloneElement(child, {
    //       theMap: this.theMap
    //     });
    //   else return child;
    // })
  }

  render() {
    if (this.theMap === null) {
      return (<div className = {styles.mapContainer}>
              <CustomControls theMap={this.theMap} />
              </div>);
    }

    this.applyPan();
    this.mappp = this.mapifyChildren();
    // const mappp = this.mapifyChildren();
    return (
      <div className={styles.mapContainer}>
        <CustomControls theMap={this.theMap} />
        {this.mappp}
      </div>
    );
  }
}

MapContainer.propTypes = {
  mapStoreSetView: React.PropTypes.func.isRequired,
  mapStoredView: React.PropTypes.object.isRequired,
  mapStoredPan: React.PropTypes.array,
  children: React.PropTypes.any.isRequired,
};
const mapState = (state) => ({
  mapStoredView: mapStoreGetView(state),
  mapStoredPan: mapStoreGetPan(state),

});
const mapDispatch = {
  mapStoreSetView,
};
export default connect(mapState, mapDispatch)(pure(MapContainer));
