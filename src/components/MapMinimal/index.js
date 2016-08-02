import React from 'react';
import ReactDOM from 'react-dom';
import pure from 'recompose/pure';
import styles from './styles.css';
require('mapbox.js'); // <-- auto-attaches to window.L
require('leaflet/dist/leaflet.css');


class Map extends React.Component {
  componentDidMount() {
    let theMap = null;

    const domNode = ReactDOM.findDOMNode(this);
    window.L.mapbox.accessToken =
    'pk.eyJ1IjoiZHJ2ciIsImEiOiI3NWM4ZWE1MWEyOTVmZTQ0ZDU2OTE5OGIwNzRlMWY2NyJ9.ybLA6tItFcbyAQyxRq3Pog';
    theMap = window.L.mapbox.map(domNode, 'mapbox.streets');
    theMap.setView([40, -74.50], 12);

    window.setTimeout(function () {
      theMap.invalidateSize(true);
    }, 500);
  }

  render() {
    return (
      <div className = {styles.mapContainer}>
      </div>
    );
  }
}

const PureMap = pure(Map);

export default PureMap;
