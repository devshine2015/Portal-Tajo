import React from 'react';
import pure from 'recompose/pure';
import { getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import { hideLayer } from 'utils/mapBoxMap';
import styles from './../styles.css';

class MWAJobMarker extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theMarker = null;
    this.markerLayer = null;
  }

  componentDidMount() {
    this.theLayer = this.props.theLayer;
    this.createMarker();
    this.setPosition();
  }

  setPosition() {
    this.theMarker.setLatLng(this.latLngFromJob());
  }
  createMarker() {
    if (this.theMarker === null) {
      this.theMarker = window.L.marker(this.latLngFromJob(),
        {
            //   title: this.props.theMWAJob.WLMA_JOB_CODE,
          title: this.props.theMWAJob.carName,
          riseOnHover: true,
        });
      this.theMarker.setZIndexOffset(2000);
      this.setSelected(false);
    } else {
      this.setPosition();
    }
    hideLayer(this.props.theLayer, this.theMarker, false);
  }
  toggle(doShow) {
    hideLayer(this.theLayer, this.theMarker, !doShow);
  }
  setSelected(isSelected) {
    if (this.theMarker === null) {
      return;
    }
    const markerHtmlStyles = `
  background-color: ${isSelected ? '#e64a19' : '#82b999'};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1rem;
  top: -1rem;
  position: relative;
  border-radius: 2rem 2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const icon = window.L.divIcon({
  // className,
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
})
    this.theMarker.setIcon(
      icon,
        // // window.L.Icon.Default()
        // window.L.mapbox.marker.icon({
        //   'marker-color': isSelected ? 'red' : 'green',
        // })
    );
    if(isSelected)
      this.theMarker.setZIndexOffset(2000);
      // this.theMarker.bringToFront();
    else
      this.theMarker.setZIndexOffset(1000);
            // this.theMarker.bringToBack();
  }
  latLngFromJob = () => (
      window.L.latLng(parseFloat(this.props.theMWAJob.X), parseFloat(this.props.theMWAJob.Y))
  );

  render() {
    this.setSelected(this.props.isSelected);
    return false;
  }
}

MWAJobMarker.propTypes = {
  theLayer: React.PropTypes.object,
  theMWAJob: React.PropTypes.object,
  isSelected: React.PropTypes.bool.isRequired,
};
const PureMWAJobMarker = pure(MWAJobMarker);

// export default PureMWAJobMarker;

export const mapMWAJobMarkerMaker = (mwaJob, gfLayer, isSelected) => (
      <PureMWAJobMarker
        key={mwaJob.id}
        theLayer={gfLayer}
        theMWAJob={mwaJob}
        isSelected={isSelected}
      />
    );
