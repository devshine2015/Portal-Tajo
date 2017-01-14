// import { NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';
import { makeLocalGF } from 'services/FleetModel/utils/gfHelpers';
const iconCircle16 = require('assets/images/gf_add_icons/circle16.png');
const iconPoly16 = require('assets/images/gf_add_icons/polygon16.png');


export function contextMenuAddGFItems(subjUpdateFunc) {
  return [{ text: 'Add Circular GF',
    icon: iconCircle16,
    callback: initiateGfCircleEditingCallback(subjUpdateFunc),
  }, { text: 'Add Polygon GF',
    icon: iconPoly16,
    callback: initiateGfPolygonEditingCallback(subjUpdateFunc),
  }];
}

function initiateGfPolygonEditingCallback(subjUpdateFunc) {
  return (e) => {
    subjUpdateFunc(makeLocalGF({ center: e.latlng, isPolygon: true }));
  };
}

function initiateGfCircleEditingCallback(subjUpdateFunc) {
  return (e) => {
    subjUpdateFunc(makeLocalGF({ center: e.latlng }));
  };
}

// export function initiateGfEditingCallback_LEGACY(theMap, subjUpdateFunc) {
//   return (e) => {
//     // if (inThis.props.gfEditMode) { // already editing?
//     //   return;
//     // }
//     subjUpdateFunc(makeLocalGF({ center: e.latlng }));
//     if (theMap.getZoom() < NEW_GF_REQUIRED_ZOOM_LEVEL) {
//       theMap.setZoomAround(e.latlng, NEW_GF_REQUIRED_ZOOM_LEVEL);
//     }
//   };
// }
