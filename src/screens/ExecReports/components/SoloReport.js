//
// one vehicle report
//
import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';

import Layout from 'components/Layout';
import AnimatedLogo from 'components/animated';

import SoloHeader from './SoloHeader';
import SoloDetails from './SoloDetails';
import TripsReport from './TripsReport';
import TripsTimeLine from './TimeLine/TripsTimeLine';
// import ReportMap from './ReportMap';

import MainActionButton from 'components/Controls/MainActionButton';

import { getInstanceExecReportFrameById } from './../services/reducer';

// const printJSin = require('print.js/dist/print.min.js');
// import classes from './classes';

class SoloReport extends React.Component {

  // printDiv = (divName) => {
  //   const printContents = document.getElementById(divName).innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;

  //   window.print();

  //   document.body.innerHTML = originalContents;
  // }

  doPrint = () => {
    window.print();
    // this.printDiv('drvrSoloReport');
    // const asdf = printJS;
    // printJS('drvrSoloReport', 'html');
  }
  render() {
    // return (<AnimatedLogo.FullscreenLogo />);
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame.isLoading()) {
      return <AnimatedLogo.FullscreenLogo />;
    }
    if (!reportFrame.hasData()) {
      return false;
    }
    return (
      <Layout.Content>
        <div id="drvrSoloReport" style={{ overflow: 'scroll', paddingTop: 12, marginBottom: 12 }}>
          {/* <Layout.Header label={'EXECUTIVE REPORT'} />*/}
          <SoloHeader vehicleId={this.props.vehicleId} />
          <SoloDetails vehicleId={this.props.vehicleId} />
          <TripsTimeLine vehicleId={this.props.vehicleId} />
          <TripsReport vehicleId={this.props.vehicleId} />
          {/*<ReportMap reportFrame={this.props.reportFrame} />*/}
        </div>
        <MainActionButton
          label={'PRINT'}
          onClick={this.doPrint}
          icon={null}
        />
      </Layout.Content>
    );
  }
}

SoloReport.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  getSoloReportById: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
});

const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(SoloReport));
