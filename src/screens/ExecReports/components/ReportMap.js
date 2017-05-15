import React from 'react';
import Layout from 'components/Layout';
import TheMap from 'containers/Map/MapContainer';
import ChroniclePath from 'containers/Map/OnMapElements/ChroniclePath';

class ReportMap extends React.Component {

  makeChronoPath = () => {
    if (this.props.reportFrame === null) {
      return null;
    }
    const vehCronicleFrame = this.props.reportFrame;
    if (!vehCronicleFrame.isValid() || !vehCronicleFrame.hasPositions()) {
      return null;
    }
    return (
      <ChroniclePath
        chronicleFrame={vehCronicleFrame}
        isSelected
      />
    );
  };

  render() {
    return (
      <Layout.Content style={{ height: 400 }}>
        <TheMap noCustomControls noLayersControl>
          {this.makeChronoPath()}
        </TheMap>
      </Layout.Content>
    );
  }
}

ReportMap.propTypes = {
  reportFrame: React.PropTypes.object,
};
ReportMap.defaultProps = {
  reportFrame: null,
};

export default ReportMap;
