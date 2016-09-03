require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');
// require('leaflet-editable/handler/Edit.SimpleShape');
// require('leaflet-editable/handler/Edit.Circle');
require('leaflet-draw');


import { MAPBOX_KEY, ZERO_LOCATION, ZERO_ZOOM, NEW_GF_REQUIRED_ZOOM_LEVEL } from 'utils/constants';

export default function createMapboxMap(domNode) {
  let theMap = null;
  window.L.mapbox.accessToken = MAPBOX_KEY;
  theMap = window.L.mapbox.map(domNode);
  theMap.setView(ZERO_LOCATION, ZERO_ZOOM);

  // theMap.on('contextmenu', (e) => ((inThis) => {
  //   // if (inThis.props.gfEditMode) { // already editing?
  //   //   return;
  //   // }
  //   inThis.setRefPos(e.latlng);
  //   inThis.props.eventDispatcher.fireEvent(mapEvents.MAP_GF_ADD, { obj: null, pos: e.latlng });
  //   if (inThis.theMap.getZoom() < NEW_GF_REQUIRED_ZOOM_LEVEL) {
  //     inThis.theMap.setZoomAround(e.latlng, NEW_GF_REQUIRED_ZOOM_LEVEL);
  //   }
  // })(this));

  const tilesOSM = window.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });
  window.L.control.layers({
    StreetsDef: window.L.mapbox.tileLayer('mapbox.streets'),
    Streets: tilesOSM.addTo(theMap),
    Satelite: window.L.mapbox.tileLayer('mapbox.streets-satellite'),
    Emerald: window.L.mapbox.tileLayer('mapbox.emerald'),
    Run: window.L.mapbox.tileLayer('mapbox.run-bike-hike'),
    Light: window.L.mapbox.tileLayer('mapbox.light'),
    Dark: window.L.mapbox.tileLayer('mapbox.dark'),
    Wheat: window.L.mapbox.tileLayer('mapbox.wheatpaste'),
    Basic: window.L.mapbox.tileLayer('mapbox.streets-basic'),
    Outdoors: window.L.mapbox.tileLayer('mapbox.outdoors'),
    Pencil: window.L.mapbox.tileLayer('mapbox.pencil'),
  },
  {},
  { position: 'topleft' }).addTo(theMap);

  // do this to resize map on div
  window.setTimeout(
   (((map) => () => {
     map.invalidateSize(true);
   })(theMap)),
    500);

  return theMap;
}
