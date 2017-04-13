import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { hideLayer } from 'utils/mapBoxMap';
import { mwaSelectJob } from 'services/MWA/actions';
import { getMWASelectedJobId } from 'services/MWA/reducer';

require('containers/MapFleet/leafletStyles.css');

const markerHtmlStylesCore = `
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1rem;
  top: -1rem;
  position: relative;
  border-radius: 2rem 2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF;`;

class MWAJobMarker extends React.Component {
  constructor(props) {
    super(props);
    this.theLayer = null;
    this.theMarker = null;
    this.markerLayer = null;
  }

  componentDidMount() {
    this.theLayer = this.props.theMap;
    this.createMarker();
    this.setPosition();
  }

  setPosition() {
    this.theMarker.setLatLng(this.latLngFromJob());
  }

  setSelected(isSelected, isMyVehicleSelected) {
    const nowColor = isSelected ? '#e64a19' :
      (isMyVehicleSelected ? '#2969c3' : '#adafae');
    const markerHtmlStyles = markerHtmlStylesCore.concat(`background-color: ${nowColor}`);
    const icon = window.L.divIcon({
      className: 'drvr-leaflet-div-icon',
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`,
    });
    this.theMarker.setIcon(
      icon,
    );
    if (isSelected || isMyVehicleSelected) {
      this.theMarker.setZIndexOffset(2000);
    } else {
      this.theMarker.setZIndexOffset(1000);
    }
  }

  createMarker() {
    if (this.theMarker === null) {
      const clickHandle = () => {
        // this.props.mwaSelectJob(this.props.theMWAJob.id);
      };
      this.theMarker = window.L.marker(this.latLngFromJob(),
        {
            //   title: this.props.theMWAJob.WLMA_JOB_CODE,
          title: this.props.theMWAJob.name,
          riseOnHover: true,
        });

      this.theMarker.setZIndexOffset(2000)
        .on('click', clickHandle);
      this.setSelected(false, false);
    } else {
      this.setPosition();
    }
    hideLayer(this.theLayer, this.theMarker, false);
  }

  latLngFromJob = () => (
      window.L.latLng(parseFloat(this.props.theMWAJob.X), parseFloat(this.props.theMWAJob.Y))
  );

  render() {
    if (this.theMarker !== null) {
      this.setSelected(this.props.selectedId === this.props.theMWAJob.id, false); //this.props.isMyVehicleSelected);
      hideLayer(this.theLayer, this.theMarker, this.props.theMWAJob.filteredOut);
    }
    return false;
  }
}

MWAJobMarker.propTypes = {
  theMap: React.PropTypes.object,
  theMWAJob: React.PropTypes.object,
  mwaSelectJob: React.PropTypes.func.isRequired,
  selectedId: React.PropTypes.string.isRequired,
};

const mapState = (state) => ({
  selectedId: getMWASelectedJobId(state),
});
const mapDispatch = {
  mwaSelectJob,
};

const PureMWAJobMarker = connect(mapState, mapDispatch)(pure(MWAJobMarker));

export const mapMWAJobMarkerMaker = (mwaJob) =>
(<PureMWAJobMarker
  key={mwaJob.id}
  theMap={null}
  theMWAJob={mwaJob}
/>);
