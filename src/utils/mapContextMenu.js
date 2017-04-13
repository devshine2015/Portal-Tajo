// import { NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';
import { makeLocalGF } from 'services/FleetModel/utils/gfHelpers';

const iconCircle16 = require('assets/images/gf_add_icons/circle16.png');
const iconPoly16 = require('assets/images/gf_add_icons/polygon16.png');
const iconGMaps16 = require('assets/images/context_menu_icons/gmap16.png');
const iconRoute16 = require('assets/images/context_menu_icons/rt01_16.png');
const iconNearby16 = require('assets/images/context_menu_icons/nearby16.png');

// export const mItmRouteTo = 'route';
// export const mItmNearest = 'neares';
// export const mItmGFEditPoly = 'polyGF';

// const MapMenuItem = {
//   RouteTo: 'route',
//   Nearest: 'nearest',
//   ShowOnGMap: 'gmap',
// }; 

const contextMenuItems = {
  mItmRouteTo: {
    text: 'Route To',
  },
  mItmNearest: {
    text: 'Find Nearest',
  },
  mItmGFCircle: {
    text: 'Circualr GF',
  },
  mItmGFPoly: {
    text: 'Poly GF',
  },
};

export function addMapMenuItem(theMap, itemKey, callback) {
  const theItem = contextMenuItems[itemKey];
  theMap.contextmenu.addItem({
    text: theItem.text,
    callback,
  });
}

// export function contextMenuAddGFItems(subjUpdateFunc, routeFunc = null, nearFunc = null) {
//   const menuItems = [{ text: 'Add Circular GF',
//       icon: iconCircle16,
//       callback: initiateGfCircleEditingCallback(subjUpdateFunc),
//     }, { text: 'Add Polygon GF',
//       icon: iconPoly16,
//       callback: initiateGfPolygonEditingCallback(subjUpdateFunc),
//   }, '-'];
//   if (routeFunc !== null) {
//     menuItems.push({ text: 'Route',
//     icon: iconRoute16,
//     callback: routToPoint(routeFunc),
//     });
//   }
//   if (nearFunc !== null) {
//     menuItems.push({ text: 'Find Nearest',
//     icon: iconNearby16,
//     callback: routToPoint(nearFunc),
//     });
//   }
//   menuItems.push({ text: 'Google Maps',
//     icon: iconGMaps16,
//     callback: openGMaps(),
//   });
//   return menuItems;
// }

// const routToPoint = routeFunc => e =>
//   routeFunc(e.latlng);

// function openGMaps() {
//   return (e) => {
//      window.open(`https://www.google.com/maps?q=${e.latlng.lat},${e.latlng.lng}`);
//     //  ,15z
//    };
// }

// function initiateGfPolygonEditingCallback(subjUpdateFunc) {
//   return (e) => {
//     subjUpdateFunc(makeLocalGF({ points: [e.latlng], kind: 'poly' }));
//   };
// }

// function initiateGfCircleEditingCallback(subjUpdateFunc) {
//   return (e) => {
//     subjUpdateFunc(makeLocalGF({ center: e.latlng }));
//   };
// }
