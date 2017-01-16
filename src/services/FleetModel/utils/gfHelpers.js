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

// const __backEndGF = {
//     name: "test-poly-gf-123",
//     kind: "poly",
//     points: [{lat: 43.66357999284051,lng:161.51680106706948},
//     {lat:44.004389983713736,lng:-105.11418985072132},
//     {lat:29.657705069923352,lng:-93.4840957310216}],
//     address:"some address asdf",
//     status:"active"
//   };
  const backEndGF = {
    name: inData.name || '',
    address: inData.address || '',
    status: 'active',
  };
  if (inData.isPolygon) {
    backEndGF.kind = 'poly';
//    backEndGF.points = inData.latLngs;
    backEndGF.points = [];
    inData.latLngs.forEach(latLng => {
      backEndGF.points.push({ lat: latLng.lat, lng: latLng.lng });
    });
  } else {
    backEndGF.center = {
      lat: inData.pos ? inData.pos.lat : ZERO_LOCATION[0],
      lng: inData.pos ? inData.pos.lng : ZERO_LOCATION[1],
    };
    backEndGF.radius = inData.radius ? parseInt(inData.radius, 10) : NEW_GF_RADIUS;
  }
  return backEndGF;
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
//  theGF.kind = srcGFObject.hasOwnProperty('kind') ? srcGFObject.kind : '';
  // synthetic
  theGF.isPolygon = srcGFObject.hasOwnProperty('isPolygon') ? srcGFObject.isPolygon : false;
  theGF.isPolygon = theGF.isPolygon || srcGFObject.kind === 'poly';
  theGF.isDepot = false; // srcGFObject.kind === GF_DEPOT_KIND : false;

  if (theGF.isPolygon) {
    theGF.latLngs = srcGFObject.points;
    theGF.pos = [srcGFObject.points[0].lat, srcGFObject.points[0].lng];
// theGF.radius = 100;
  } else {
    // is CIRCULAR? - use center and radius
    theGF.pos = [srcGFObject.center.lat, srcGFObject.center.lng];
    theGF.radius = srcGFObject.hasOwnProperty('radius') ? srcGFObject.radius : 100;
  }
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
