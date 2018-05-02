import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import { createMapboxMap } from 'utils/mapBoxMap';
import { ifArraysEqual } from 'utils/arrays';

import CustomControls from './OnMapElements/CustomControls';
import {
  mapStoreSetView,
  mapStoreGetView,
  mapStoreGetPan,
  mapGetFocusCoords,
  mapCleanFocusCoords } from './reducerAction';
import styles from './styles.css';

// export const MapOptions = {
//   gMapsLink: 1,
//   editGF: 1 << 1,
// };

// import { gfEditUpdate } from 'containers/GFEditor/actions';
// import { gfEditIsEditing } from 'containers/GFEditor/reducer';
// import { contextMenuAddGFItems } from 'containers/GFEditor/utils';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theMap: null,
    };

    this.mappp = null;
    this.mappedMap = {};
    this.latestPan = [];
    this.node = null;
    this.focusedMarker = null;
  }

  componentDidMount() {
    this.createMapboxMap();
  }

  componentWillReceiveProps(nextProps) {
    this.clearFocusedCircle();

    if (nextProps.mapStoredFocus !== null) {
      this.state.theMap.panTo(nextProps.mapStoredFocus);
      this.updateFocusedCircle(nextProps.mapStoredFocus);
    }
  }

  componentWillUnmount() {
    // TODO: need to shutdown the mapbox object?
    this.props.mapStoreSetView(this.state.theMap.getCenter(), this.state.theMap.getZoom());

    //  clearing mapStoredFocus
    this.props.mapCleanFocusCoords();
    this.clearFocusedCircle();
  }

  updateFocusedCircle(coords) {
    this.focusedMarker = window.L.circleMarker(coords,
      {
        color: 'yellow',
        opacity: 0.4,
        fillColor: 'yellow',
        fillOpacity: 0.4,
      },
    ).setRadius(20);
    this.state.theMap.addLayer(this.focusedMarker);
    this.focusedMarker.bringToBack();
  }

  clearFocusedCircle() {
    if (this.focusedMarker !== null) {
      this.state.theMap.removeLayer(this.focusedMarker);
    }
  }

  createMapboxMap() {
    // if already existing
    if (this.state.theMap !== null) {
      return;
    }
    this.setState({
      theMap: createMapboxMap(this.node, this.props.mapStoredView, this.props.noLayersControl),
    });
  }

  applyPan() {
    if (this.props.mapStoredPan !== null
        && (this.latestPan === null
            || !ifArraysEqual(this.props.mapStoredPan, this.latestPan))) {
      this.state.theMap.fitBounds(window.L.latLngBounds(this.props.mapStoredPan));
    }
    this.latestPan = this.props.mapStoredPan;
  }

  mapifyChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child !== null) {
        return React.cloneElement(child,
          { theMap: this.state.theMap });
      }
      return null;
    });
    // {
    //   if (child.type === MapGF)
    //     return React.cloneElement(child, {
    //       theMap: this.theMap
    //     });
    //   else return child;
    // })
  }
  mapifyKeepChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (child !== null) {
        if (this.mappedMap.hasOwnProperty(child.key)) {
          return this.mappedMap[child.key];
        }
        const mapifyedChild = React.cloneElement(child,
          { theMap: this.state.theMap });
        this.mappedMap[child.key] = mapifyedChild;
        return mapifyedChild;
        // return React.cloneElement(child,
        //     { theMap: this.state.theMap });
      }
      return null;
    });
  }

  saveRef = (node) => {
    this.node = node;
  }

  render() {
    const { theMap } = this.state;
    let mappp = null;

    if (theMap !== null) {
      this.applyPan();
      mappp = this.mapifyChildren();
      // return (
      //   <div className={styles.mapContainer}>
      //     <CustomControls />
      //   </div>
      // );
    }

    // const t0 = performance.now();
    // this.mappp = this.mapifyChildren();
    // const t1 = performance.now();
    // console.log("MAPPIFY took " + (t1 - t0) + " milliseconds.");
    return (
      <div
        className={styles.mapContainer}
        ref={this.saveRef}
      >
        { theMap && !this.props.noCustomControls && <CustomControls theMap={this.state.theMap} /> }
        { theMap && mappp }
      </div>
    );
  }
}

MapContainer.propTypes = {
  noCustomControls: PropTypes.bool,
  noLayersControl: PropTypes.bool,
  mapStoreSetView: PropTypes.func.isRequired,
  mapCleanFocusCoords: PropTypes.func.isRequired,
  mapStoredView: PropTypes.object.isRequired,
  mapStoredFocus: PropTypes.object,
  mapStoredPan: PropTypes.array,
  children: PropTypes.array,
};

MapContainer.defaultProps = {
  mapStoredPan: null,
  mapStoredFocus: null,
  noCustomControls: true,
  noLayersControl: false,
  children: [],
};

const mapState = state => ({
  mapStoredView: mapStoreGetView(state),
  mapStoredPan: mapStoreGetPan(state),
  mapStoredFocus: mapGetFocusCoords(state),
});
const mapDispatch = {
  mapStoreSetView,
  mapCleanFocusCoords,
};
export default connect(mapState, mapDispatch)(pure(MapContainer));
