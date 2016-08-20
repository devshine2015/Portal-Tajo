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
export function makeLocalGF(latLng) {
  const theGF = {};
  theGF.name = '';
  theGF.filteredOut = false;
  //
  theGF.address = '';
  // latlng
  theGF.pos = latLng;
  theGF.radius = 100;
  return theGF;
}

function _makeLocalGF(backEndObject) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }

  const theGF = {};
  theGF.name = backEndObject.name;
  theGF.id = backEndObject.id;
  theGF.filteredOut = false;
  //
  theGF.address = backEndObject.address;
  // latlng
  theGF.pos = [backEndObject.center.lat, backEndObject.center.lng];
  theGF.radius = backEndObject.radius;
  return theGF;
}

export function makeLocalGFs(backEndLocationsList) {
  const theGFs = {};
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
    const localLocObj = _makeLocalGF(aLoc);
    if (localLocObj !== null) {
      theGFs[aLoc.id] = localLocObj;
    }
  });
  return theGFs;
}

// export default makeLocalGFs;
