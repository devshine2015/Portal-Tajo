require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');
// require('leaflet-editable/handler/Edit.SimpleShape');
// require('leaflet-editable/handler/Edit.Circle');
require('leaflet-draw');

import { MAPBOX_KEY } from 'utils/constants';

export function createMapboxMap(domNode, view) {
  let theMap = null;
  window.L.mapbox.accessToken = MAPBOX_KEY;
  theMap = window.L.mapbox.map(domNode);
  theMap.setView(view.center, view.zoom);

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

export function hideLayer(containerLayer, layer, doHide) {
  if (doHide) {
    if (containerLayer.hasLayer(layer)) {
      containerLayer.removeLayer(layer);
    }
  } else {
    if (!containerLayer.hasLayer(layer)) {
      containerLayer.addLayer(layer);
    }
  }
}
