// {
//     "name":         "Shallow Inlet",
//     "center":{
//         "lat": -38.807778,
//         "lng": 146.148889
//     },
//     "radius": 200.0,
//     "address": "Wilsons Prom",
//     "status": "active"
// }

import { ZERO_LOCATION, NEW_GF_RADIUS } from 'utils/constants';

export function makeBackendGF(inData) {
  return {
    name: inData.name || '',
    address: inData.address || '',
    center: {
      lat: inData.pos ? inData.pos.lat : ZERO_LOCATION[0],
      lng: inData.pos ? inData.pos.lng : ZERO_LOCATION[1],
    },
    radius: inData.radius ? parseInt(inData.radius) : NEW_GF_RADIUS,
    status: 'active',
  };
}
export function makeLocalLocation(latLng) {
  const theLocation = {};
  theLocation.name = '';
  theLocation.filteredOut = false;
  //
  theLocation.address = '';
  // latlng
  theLocation.pos = latLng;
  theLocation.radius = 100;
  return theLocation;
}

function _makeLocalLocation(backEndObject) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }

  const theLocation = {};
  theLocation.name = backEndObject.name;
  theLocation.id = backEndObject.id;
  theLocation.filteredOut = false;
  //
  theLocation.address = backEndObject.address;
  // latlng
  theLocation.pos = [backEndObject.center.lat, backEndObject.center.lng];
  theLocation.radius = backEndObject.radius;
  return theLocation;
}

export function makeLocalLocations(backEndLocationsList) {
  const theLocations = {};
  backEndLocationsList
  // .sort((a, b) => {
  //   const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  //   const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // })
  .forEach((aLoc) => {
    const localLocObj = _makeLocalLocation(aLoc);
    if (localLocObj !== null) {
      theLocations[aLoc.id] = localLocObj;
    }
  });
  return theLocations;
}

// export default MakeLocalLocations;
