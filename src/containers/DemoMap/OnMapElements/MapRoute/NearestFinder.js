import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { mapStoreRouteObj } from 'containers/Map/reducerAction';

import directions from 'utils/mapServices/google/directions';
import distanceMatrixToSingleDst from 'utils/mapServices/google/distanceMatrix';

import { addMapMenuItemEx } from 'utils/mapContextMenu';
const iconNearby16 = require('assets/images/demo/map-context/nearest.png');

class NearestFinder extends React.Component {

  componentDidMount() {
    addMapMenuItemEx(this.props.theMap,
      { text: this.context.translator.getTranslation('ctx_nearest'),
        icon: iconNearby16,
        callback: (e) => this.nearestVechicleToLatLng(e.latlng),
      });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
  }

  haveRoute = (latLngArray, durationMS, distanceM) => {
    this.props.mapStoreRouteObj({
      pathLatLngs: latLngArray,
      durationMS,
      distanceM,
      destination: latLngArray[latLngArray.length - 1],
    });
  }

  haveDistMatrix = (resultsArray) => {
    let bestIdx = 0;
    // find idx of the closes one
    // resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].distanceM > aRes.distanceM) bestIdx = idx; });
    // find idx of the closes one in TIME
    resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].durationMS > aRes.durationMS) bestIdx = idx; });

// console.log(resultsArray);
// console.log(`  >>>>  ${bestIdx}`);
    // this.props.selectVehicle(this.props.theVehicle.id, true);

    this.routeFromToPos(this.cachedVehicles[bestIdx].pos, this.refPos);
  }
  nearestVechicleToLatLng = (toLatLng) => {
    this.refPos = [toLatLng.lat, toLatLng.lng];
    this.cachedVehicles = [];
    const originsPos = this.props.vehicles
        .filter(aVehicle => !aVehicle.filteredOut)
        .map(aVehicle => {
          aVehicle.toRefPointDst = window.L.latLng(aVehicle.pos).distanceTo(toLatLng);
          return aVehicle;
        })
        .sort((a, b) => a.toRefPointDst - b.toRefPointDst)
        .slice(0, 20)
        .map(aVehicle => {this.cachedVehicles.push(aVehicle); return aVehicle.pos;});

    distanceMatrixToSingleDst(originsPos, this.refPos, this.haveDistMatrix, this.noHaveCallback);
  }

  routeFromToPos = (fromPos, toPos) => {
    directions(fromPos, toPos, this.haveRoute, this.noHaveCallback);
  }

  render() {
    return false;
  }
}

NearestFinder.propTypes = {
  theMap: PropTypes.object.isRequired,
  vehicles: PropTypes.array.isRequired,
  mapStoreRouteObj: PropTypes.func.isRequired,
};
NearestFinder.contextTypes = {
  translator: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
});
const mapDispatch = {
  mapStoreRouteObj,
};

export default connect(mapState, mapDispatch)(NearestFinder);
