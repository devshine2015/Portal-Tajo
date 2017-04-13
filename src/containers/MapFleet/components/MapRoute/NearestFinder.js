import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import RoutePath from './RoutePath';

import * as fromFleetReducer from 'services/FleetModel/reducer';
import { showSnackbar } from 'containers/Snackbar/actions';

import directions from 'utils/mapServices/google/directions';
import distanceMatrixToSingleDst from 'utils/mapServices/google/distanceMatrix';

import { addMapMenuItem } from 'utils/mapContextMenu';

class NearestFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routeObj: {} };
  }

  componentDidMount() {
    addMapMenuItem(this.props.theMap, 'mItmNearest', (e) => this.nearestVechicleToLatLng(e.latlng));
  }
  // shouldComponentUpdate(nextProps) {
  //   return this.props.routeToLatLng[0] !== nextProps.routeToLatLng[0];
  // }
  componentWillUnmount() {
  }

  haveRoute = (latLngArray, durationMS, distanceM) => {
    this.setState({ routeObj: {
      pathLatLngs: latLngArray,
      durationMS,
      distanceM,
      destination: latLngArray[latLngArray.length - 1],
    } });
  }

  haveDistMatrix = (resultsArray) => {
    let bestIdx = 0;
    // find idx of the closes one
    resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].distanceM > aRes.distanceM) bestIdx = idx; });
    // find idx of the closes one in TIME
    // resultsArray.forEach((aRes, idx) => {if (resultsArray[bestIdx].durationMS > aRes.durationMS) bestIdx = idx; });

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
//    this.setPath();
    return (
      <RoutePath theMap={this.props.theMap} routeObj={this.state.routeObj} />
    );
  }
}

NearestFinder.propTypes = {
  theMap: React.PropTypes.object,
  vehicles: React.PropTypes.array.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  vehicles: fromFleetReducer.getVehiclesEx(state),
});
const mapDispatch = {
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(NearestFinder));
