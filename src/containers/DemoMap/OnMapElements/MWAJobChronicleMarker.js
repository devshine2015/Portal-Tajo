import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { hideLayer } from 'utils/mapBoxMap';
import { textLable, dateToChronicleString } from 'screens/Chronicle/utils/strings';
import { msToTimeIntervalString } from 'utils/convertors';

require('containers/Map/leafletStyles.css');

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

class MWAJobChronicleMarker extends React.Component {
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

  componentWillUnmount() {
// TODO: need to delete MapBox markers?
    hideLayer(this.theLayer, this.theMarker, true);
  }

  setPosition() {
    this.theMarker.setLatLng(this.latLngFromJob());
  }

  setSelected(isSelected, isMyVehicleSelected) {
    const nowColor = isSelected && isMyVehicleSelected ? '#e64a19' :
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
    if (isSelected && isMyVehicleSelected) {
      this.theMarker.setZIndexOffset(2500);
    } else if (isMyVehicleSelected) {
      this.theMarker.setZIndexOffset(2000);
    } else {
      this.theMarker.setZIndexOffset(0);
    }
  }

  checkValue(val) {
    const empty = val === null || val === '' || val === ' ';
    return !empty;
  }

  createMarker() {
    if (this.theMarker === null) {
      const clickHandle = () => {
        // this.props.mwaSelectJob(this.props.theMWAJob.id);
      };
      const aJob = this.props.theMWAJobChronicle;
      this.theMarker = window.L.marker(this.latLngFromJob(),
        {
            //   title: this.props.theMWAJob.WLMA_JOB_CODE,
          title: aJob.name,
          riseOnHover: true,
        })
        .bindPopup(`${textLable(this.context.translator.getTranslation('from'),
           dateToChronicleString(aJob.begin), false)}
        ${textLable(this.context.translator.getTranslation('to'),
          dateToChronicleString(aJob.end))}
        ${textLable(this.context.translator.getTranslation('job_duration'),
          msToTimeIntervalString(aJob.end.getTime() - aJob.begin.getTime()))}
        ${textLable(this.context.translator.getTranslation('job_name'),
          aJob.name)}
        ${this.checkValue(aJob.JOB_STATUS_DESC) ?
          textLable(this.context.translator.getTranslation('job_status'),
                    aJob.JOB_STATUS_DESC) 
          : ''}
        ${this.checkValue(aJob.REMARK) ? textLable('Remark', aJob.REMARK) : ''}
        ${this.checkValue(aJob.REQUESTER_NAME) ? textLable('Requester', aJob.REQUESTER_NAME) : ''}
        ${this.checkValue(aJob.PIPE_SIZE_DESC) ? 
          textLable(this.context.translator.getTranslation('job_pipe'), 
                    aJob.PIPE_SIZE_DESC)
          : ''}
        ${this.checkValue(aJob.PIPE_TYPE_DESC) ? 
          textLable(this.context.translator.getTranslation('job_pipe_type'),
                    aJob.PIPE_TYPE_DESC)
          : ''}
        `,
        {
          offset: [0, 0],
          className: 'widePopUp',
          closeButton: false,
          closeOnClick: false,
          autoPan: false,
          keepInView: false,
          zoomAnimation: true,
        });

      this.theMarker.setZIndexOffset(2000)
        .on('click', clickHandle);
      this.setSelected(true, true);
    } else {
      this.setPosition();
    }
    hideLayer(this.theLayer, this.theMarker, false);
  }

  latLngFromJob = () => (
      window.L.latLng(parseFloat(this.props.theMWAJobChronicle.X), parseFloat(this.props.theMWAJobChronicle.Y))
  );

  render() {
    if (this.theMarker !== null) {
      this.setSelected(true, true);
      hideLayer(this.theLayer, this.theMarker, false);
    }
    return false;
  }
}

MWAJobChronicleMarker.contextTypes = {
  translator: PropTypes.object.isRequired,
};
MWAJobChronicleMarker.propTypes = {
  theMap: PropTypes.object,
  theMWAJobChronicle: PropTypes.object.isRequired,
};

MWAJobChronicleMarker.defaultProps = {
  theMap: null,
};

const PureMWAJobMarker = pure(MWAJobChronicleMarker);

const mapMWAJobChronicleMarkerMaker = mwaChronicleJob =>
(<PureMWAJobMarker
  key={mwaChronicleJob.id}
  theMap={null}
  theMWAJobChronicle={mwaChronicleJob}
/>);

export default mapMWAJobChronicleMarkerMaker;
