// import { NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';
import { makeLocalGF } from 'services/FleetModel/utils/gfHelpers';
const iconCircle16 = require('assets/images/gf_add_icons/circle16.png');
const iconPoly16 = require('assets/images/gf_add_icons/polygon16.png');
const iconGMaps16 = require('assets/images/context_menu_icons/gmap16.png');


export function contextMenuAddGFItems(subjUpdateFunc) {
  return [{ text: 'Add Circular GF',
    icon: iconCircle16,
    callback: initiateGfCircleEditingCallback(subjUpdateFunc),
  }, { text: 'Add Polygon GF',
    icon: iconPoly16,
    callback: initiateGfPolygonEditingCallback(subjUpdateFunc),
  }, { text: 'Google Maps',
    icon: iconGMaps16,
    callback: openGMaps(subjUpdateFunc),
  }];
}

function openGMaps(subjUpdateFunc){
   return (e) => {
    // https://www.google.com/maps/@51.3317678,12.3902356,13.08z 
    window.open(`https://www.google.com/maps/@${e.latlng.lat},${e.latlng.lng},15z`);
  }; 
}

function initiateGfPolygonEditingCallback(subjUpdateFunc) {
  return (e) => {
    subjUpdateFunc(makeLocalGF({ points: [e.latlng], kind: 'poly' }));
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
