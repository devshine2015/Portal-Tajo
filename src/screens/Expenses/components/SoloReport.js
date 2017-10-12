import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import Toggle from 'material-ui/Toggle';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import Layout from 'components/Layout';
import MainActionButton from 'components/Controls/MainActionButton';
import AnimatedLogo from 'components/animated';
import SoloHeader from './SoloHeader';
// import SoloDetails from './SoloDetails';
// import TripsReport from './TripsReport';
import NoPrint from './NoPrint';
import TripsTimeLine from './TimeLine/TripsTimeLine';
// import ReportMap from './ReportMap';
import UglyTable from './UglyTable/UglyTable';
import TotalsTable from './TotalsTable/TotalsTable';
import generatReportPDF from './UglyTable/UglyTablePDF';
import generatReportSpreadsheet from './UglyTable/UglyTableSpreadsheet';
// import EventsTable from './EventsTable/EventsTable';
import { getInstanceExecReportFrameById } from './../services/reducer';
import phrases from './PropTypes';

class SoloReport extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uglyTable: true,
      events: true,
      timeLine: true,
    };
  }

  onToggleUglyTable = (e, toggled) => {
    this.setState({ uglyTable: toggled });
  }
  onToggleTimeLine = (e, toggled) => {
    this.setState({ timeLine: toggled });
  }
  onToggleEvents = (e, toggled) => {
    this.setState({ events: toggled });
  }
  doPrint = () => {
    window.print();
  }
  doSavePDF = () => {
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null) {
      return;
    }

    generatReportPDF(reportFrame, this.props.getVehicleById(this.props.vehicleId), this.tableRef);
  }
  doSaveEXCEL = () => {
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame === null) {
      return;
    }
    generatReportSpreadsheet(reportFrame, this.props.getVehicleById(this.props.vehicleId), { fileName: 'tripReport' });
  }


  render() {
    const { translations } = this.props;
    const reportFrame = this.props.getSoloReportById(this.props.vehicleId);
    if (reportFrame.isLoading()) {
      return <AnimatedLogo.FullscreenLogo />;
    }
    if (!reportFrame.hasData()) {
      return false;
    }
    const aniEnter = { animation: 'slideDown', duration: 300 };
    const aniLeave = { animation: 'slideUp', duration: 300 };
    const sectionStyle = { padding: 32 };
    return (
      <Layout.Content noPadding maxWidth={'inherit'}>
        <div id="drvrSoloReport" style={{ overflow: 'scroll', paddingTop: 12, marginBottom: 12 }}>
          {/* <Layout.Header label={'EXECUTIVE REPORT'} />*/}
          <Layout.Section style={sectionStyle}>
            <SoloHeader vehicleId={this.props.vehicleId} />
          </Layout.Section>
          {/* <Layout.Section style={sectionStyle}>
            <Layout.Header label={'OVERVIEW'} />
            <SoloDetails vehicleId={this.props.vehicleId} />
          </Layout.Section>*/}
          <Layout.Section style={sectionStyle}>
            <Layout.Header label={translations.trip_details} />
            <NoPrint style={{ padding: 20 }}>
              <Toggle
                labelPosition="right"
                toggled={this.state.uglyTable}
                onToggle={this.onToggleUglyTable}
              />
            </NoPrint>
            <VelocityTransitionGroup enter={aniEnter} leave={aniLeave} >
              {this.state.uglyTable &&
              <UglyTable vehicleId={this.props.vehicleId} />}
              {this.state.uglyTable &&
              <TotalsTable vehicleId={this.props.vehicleId} />}
              <div style={{ }}>
                <MainActionButton
                  label={translations.save_spreadsheet}
                  onClick={this.doSaveEXCEL}
                  icon={null}
                />
              </div>
              <div style={{ paddingBottom: 20 }}>
                <MainActionButton
                  label={translations.save_pdf}
                  onClick={this.doSavePDF}
                  icon={null}
                />
              </div>

            </VelocityTransitionGroup>
          </Layout.Section>
          {/* <NoPrint>
            <Toggle
              label={'Events'}
              labelPosition="right"
              toggled={this.state.events}
              onToggle={this.onToggleEvents}
            />
          </NoPrint>
          {this.state.events &&
          <EventsTable vehicleId={this.props.vehicleId} />}*/}
          <Layout.Section style={sectionStyle}>
            <Layout.Header label={translations.timeline} />
            <NoPrint style={{ padding: 20 }}>
              <Toggle
                labelPosition="right"
                defaultToggled
                onToggle={this.onToggleTimeLine}
              />
            </NoPrint>
            <VelocityTransitionGroup enter={aniEnter} leave={aniLeave} >
              {this.state.timeLine &&
              <TripsTimeLine vehicleId={this.props.vehicleId} />}
            </VelocityTransitionGroup>
          </Layout.Section>

          {/* <SoloDetails vehicleId={this.props.vehicleId} />
          <TripsTimeLine vehicleId={this.props.vehicleId} />
          <TripsReport vehicleId={this.props.vehicleId} />*/}
          {/* <ReportMap reportFrame={this.props.reportFrame} />*/}
        </div>
        <div style={{ margin: 32 }}>
          <MainActionButton
            label={translations.print}
            onClick={this.doPrint}
            icon={null}
          />
        </div>
      </Layout.Content>
    );
  }
}

SoloReport.propTypes = {
  vehicleId: PropTypes.string.isRequired,
  getSoloReportById: PropTypes.func.isRequired,
  getVehicleById: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
  getVehicleById: getVehicleByIdFunc(state),
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(pure(translate(phrases)(SoloReport)));
