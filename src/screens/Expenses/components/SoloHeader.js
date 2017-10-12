import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import { getVehicleByValue } from 'services/FleetModel/utils/vehiclesMap';
import { getVehicleByIdFunc } from 'services/FleetModel/reducer';
import Layout from 'components/Layout';
import { getInstanceExecReportFrameById } from '../services/reducer';
import phrases from './PropTypes';

const STYLES = {
  title: {
    textTransform: 'capitalize',
  },
  value: {
    paddingLeft: 8,
    paddingRight: 12,
    fontWeight: 'bolder',
  },
};

const Title = ({ text }) => (
  <span style={STYLES.title}>
    { `${text}:` }
  </span>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

const Value = ({ text }) => (
  <span style={STYLES.value}>
    { text }
  </span>
);

Value.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const SoloHeader = ({
  vehicleId,
  getSoloReportById,
  getVehicleById,
  translations,
}, context) => {
  const theVehicle = getVehicleById(vehicleId);
  const reportFrame = getSoloReportById(vehicleId);
  if (theVehicle === null
  || !reportFrame.hasData()) {
    return false;
  }
  const hPadding = 7;
  const kindData = getVehicleByValue(theVehicle.original.kind);
  const kindLabel = context.translator.getTranslation(kindData.value.toLowerCase());
  // const propDivStyle = { textAlign: 'center', paddingTop: hPadding };
  const propDivStyle = { paddingLeft: 100, paddingTop: hPadding };
  return (
    <Layout.Content style={{ padding: '32px 0 32px 0' }}>
      <Layout.Header
        label={theVehicle.original.name}
        style={{ textAlign: 'center', paddingLeft: 0 }}
      />
      <div style={propDivStyle}>
        <Title text={translations.kind} />
        <Value text={kindLabel} />
      </div>
      <div style={propDivStyle}>
        <Title text={translations.license_plate} />
        <Value text={theVehicle.original.licensePlate} />
      </div>
      <div style={propDivStyle}>
        <Title text={translations.make} />
        <Value text={theVehicle.original.make} />
        <Title text={translations.model_name} />
        <Value text={theVehicle.original.model} />
        <Title text={translations.year} />
        <Value text={theVehicle.original.year} />
      </div>
      {/* <div style={propDivStyle}>
        <span >
          DeviceId:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {theVehicle.original.deviceId}
        </span>
      </div>
      <div style={propDivStyle}>
        <span >
          Id:
        </span>
        <span style={{ paddingLeft: 8, fontWeight: 'bolder' }}>
          {theVehicle.original.id}
        </span>
      </div>*/}
      <div style={propDivStyle}>
        <Title text={translations.report_from} />
        <Value text={reportFrame.dateFrom.toLocaleString()} />
        <Title text={translations.to} />
        <Value text={reportFrame.dateTo.toLocaleString()} />
      </div>
      <div style={propDivStyle}>
        <Title text={translations.trips} />
        <Value text={reportFrame.getValidTrips().length} />
      </div>
    </Layout.Content>
  );
};

SoloHeader.contextTypes = {
  translator: PropTypes.object.isRequired,
};

SoloHeader.propTypes = {
  vehicleId: PropTypes.string.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
  getSoloReportById: PropTypes.func.isRequired,
  getVehicleById: PropTypes.func.isRequired,
};

const mapState = state => ({
  getSoloReportById: getInstanceExecReportFrameById(state),
  getVehicleById: getVehicleByIdFunc(state),
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(pure(translate(phrases)(SoloHeader)));
