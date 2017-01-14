// {
//     "name":         "Shallow Inlet",
//     "center":{
//         "lat": -38.807778,
//         "lng": 146.148889
//     },
//     "radius": 200.0,
//     "address": "Wilsons Prom",
//     "status": "active",
// }

// GF_DEPOT_KIND -> its a base/home/depot/warehouse/asset GF, used for
// automatic trip detections etc
//

import { ZERO_LOCATION, NEW_GF_RADIUS } from 'utils/constants';
import { sortByName } from 'utils/sorting';

export function makeBackendGF(inData) {
  return {
    name: inData.name || '',
    address: inData.address || '',
    center: {
      lat: inData.pos ? inData.pos.lat : ZERO_LOCATION[0],
      lng: inData.pos ? inData.pos.lng : ZERO_LOCATION[1],
    },
    radius: inData.radius ? parseInt(inData.radius, 10) : NEW_GF_RADIUS,
    status: 'active',
    // kind: inData.kind || '',
  };
}
export function makeLocalGF(srcGFObject) {
  const theGF = {};
  theGF.name = srcGFObject.hasOwnProperty('name') ? srcGFObject.name : '';
  theGF.filteredOut = false;
  //
  if (srcGFObject.hasOwnProperty('id')) {
    theGF.id = srcGFObject.id;
  }
  theGF.address = srcGFObject.hasOwnProperty('address') ? srcGFObject.address : '';
  // latlng
  theGF.pos = [srcGFObject.center.lat, srcGFObject.center.lng];
  theGF.radius = srcGFObject.hasOwnProperty('radius') ? srcGFObject.radius : 100;
  theGF.kind = srcGFObject.hasOwnProperty('kind') ? srcGFObject.kind : '';

  theGF.isPolygon = srcGFObject.hasOwnProperty('isPolygon') ? srcGFObject.isPolygon : false;
  theGF.latLngs = [[srcGFObject.center.lat, srcGFObject.center.lng]];
  // synthetic
  theGF.isDepot = false; // srcGFObject.hasOwnProperty('kind') ? srcGFObject.kind === GF_DEPOT_KIND : false;
  return theGF;
}

function _makeLocalGFfromBackEndObj(backEndObject) {
  if (backEndObject.status !== 'active'
    || !backEndObject.name) {
    return null;
  }
  return makeLocalGF(backEndObject);
}

export function makeLocalGFs(backEndLocationsList) {
  const localGFs = {};
  const sortedGFs = [];

  backEndLocationsList.sort(sortByName).forEach((aLoc) => {
    const localLocObj = _makeLocalGFfromBackEndObj(aLoc);

    if (localLocObj !== null) {
      localGFs[aLoc.id] = localLocObj;
      sortedGFs.push(localLocObj.id);
    }
  });

  return {
    localGFs,
    sortedGFs,
  };
}

export function toggleDepotForGF(gfObj, isDepot) {
  // eslint-disable-next-line no-param-reassign
  gfObj.isDepot = isDepot;
}

// export default makeLocalGFs;
