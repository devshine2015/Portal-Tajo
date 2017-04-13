import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import pure from 'recompose/pure';

import CustomControls from './OnMapElements/CustomControls';

import { createMapboxMap } from 'utils/mapBoxMap';
import { ifArraysEqual } from 'utils/arrays';

import { mapStoreSetView, mapStoreGetView, mapStoreGetPan } from './reducerAction';

import styles from './styles.css';

export const MapOptions = {
  gMapsLink: 1,
  editGF: 1 << 1,
};

// import { gfEditUpdate } from 'containers/GFEditor/actions';
// import { gfEditIsEditing } from 'containers/GFEditor/reducer';
// import { contextMenuAddGFItems } from 'containers/GFEditor/utils';


class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.mappp = null;
    this.latestPan = [];
    this.state = {
      theMap: null,
    };
  }

  componentDidMount() {
    this.createMapboxMap();
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.mappp === null;
  // }

  componentWillUnmount() {
    // TODO: need to shutdown the mapbox object?
    this.props.mapStoreSetView(this.state.theMap.getCenter(), this.state.theMap.getZoom());
  }

  createMapboxMap() {
    // if already existing
    if (this.state.theMap !== null) {
      return;
    }
    this.setState({
      theMap: createMapboxMap(ReactDOM.findDOMNode(this),
                        this.props.mapStoredView),
    });
  }

  applyPan() {
    if (this.props.mapStoredPan !== null
        && (this.latestPan === null
            || !ifArraysEqual(this.props.mapStoredPan, this.latestPan))) {
      this.state.theMap.panInsideBounds(window.L.latLngBounds(this.props.mapStoredPan));
    }
    this.latestPan = this.props.mapStoredPan;
  }

  mapifyChildren() {
    return React.Children.map(this.props.children, child => {
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

  render() {
    if (this.state.theMap === null) {
      return (<div className = {styles.mapContainer}>
              <CustomControls />
              </div>);
    }

    this.applyPan();
    this.mappp = this.mapifyChildren();
    // const mappp = this.mapifyChildren();
    return (
      <div className={styles.mapContainer}>
        <CustomControls theMap={this.state.theMap} />
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
