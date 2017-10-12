import React from 'react';

//
// one vehicle report
//
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
import { connect } from 'react-redux';

import Layout from 'components/Layout';
import TripDetails from './TripDetails';

import { getInstanceExecReportFrameById } from './../services/reducer';


// const printJSin = require('print.js/dist/print.min.js');
// import classes from './classes';

class TripsReport extends React.Component {


  render() {
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null) {
      return false;
    }
    const tripsList = reportFrame.getValidTrips().map(aTrip => <TripDetails
      key={aTrip.startIdx}
      vehicleId={this.props.vehicleId}
      reportFrame={reportFrame}
      aTripData={aTrip}
    />);
    return (
      <Layout.Content>
        {tripsList}
      </Layout.Content>
    );
  }
}

TripsReport.propTypes = {
  vehicleId: PropTypes.string.isRequired,
  getSoloReportById: PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(TripsReport));
