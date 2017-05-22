//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { metersToKmString, speedToString, msToTimeIntervalString } from 'utils/convertors';

import Layout from 'components/Layout';
import ItemProperty from './DetailItemProperty';

import { getInstanceExecReportFrameById } from './../services/reducer';

// import classes from './classes';

const UglyTable = ({
  vehicleId,
  getSoloReportById,
}) => {
  const reportFrame = getSoloReportById(vehicleId);
  if (reportFrame === null) {
    return false;
  }
  return (
    <Layout.Content style={{ alignItems: 'center' }}>
      <table style={{ width: 600, border: 'solid 1px #aaa' }}>
        <ItemProperty
          title={'Start Location'}
          value={aTripData.startAddress}
        />
        <ItemProperty
          title={'End Location'}
          value={aTripData.endAddress}
        />
        <ItemProperty
          title={'Trip Duration'}
          value={msToTimeIntervalString(aTripData.durationMs)}
        />
        <ItemProperty
          title={'Trip Distance'}
          value={metersToKmString(aTripData.calculatedDistanceM)}
        />
        <ItemProperty
          title={'Max Speed'}
          value={speedToString(aTripData.maxSpeed)}
        />
        <ItemProperty
          title={'Samples all/pos'}
          value={`${aTripData.numberOfSamples}/${aTripData.numberOfPosSamples}`}
        />
      </table>
    </Layout.Content>
  );
};

UglyTable.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(UglyTable));
