//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import Layout from 'components/Layout';
import StopOver from './StopOver';
import Trip from './Trip';
import TimeStamp from './TimeStamp';
import TimeStampTerminal from './TimeStampTerminal';

import { getInstanceExecReportFrameById } from './../../services/reducer';
import { metersToKmString, speedToString, msToTimeIntervalString } from 'utils/convertors';


// const printJSin = require('print.js/dist/print.min.js');
// import classes from './classes';

class TripsTimeLine extends React.Component {


  render() {
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null) {
      return false;
    }
    const tripsList = reportFrame.tripsTimeLine.map((aSegment) => {
      if (aSegment.isAStopOver === true) {
        return <StopOver durationMs={aSegment.durationMs} address={aSegment.address} />;
      }
      else if (aSegment.isATerminal === true) {
        return <TimeStampTerminal date={aSegment.date} />;
      }
      else if (aSegment.isATimeStamp === true) {
        return <TimeStamp date={aSegment.date} />;
      }
      else {
        return <Trip aTripData={aSegment} />;
      }
    });
    return (
      <Layout.Content>
        {tripsList}
      </Layout.Content>
    );
  }
}

TripsTimeLine.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(TripsTimeLine));
