//
// one vehicle report
//
import React from 'react';
import { css } from 'aphrodite/no-important';
import Layout from 'components/Layout';
import Divider from 'material-ui/Divider';
import ItemProperty from './DetailItemProperty';
import ReportMap from './ReportMap';

import MainActionButton from 'components/Controls/MainActionButton';

// import classes from './classes';

class SoloReport extends React.Component {

  doPrint() {

  }

  renderHeaderDetails() {
    const N_A = 'N/A';

    return (
      <div>
        <Divider />
        <ReportMap reportFrame={this.props.reportFrame} />
        <Divider />
        <ItemProperty
          title={'Distance'}
          value={this.props.reportFrame.distanceM}
        />
        <ItemProperty
          title={'Samples'}
          value={this.props.reportFrame.numberOfPosSamples}
        />
      </div>
    );
  }

  render() {
    return (
      <Layout.Content>
        <Layout.Header label={'EXECUTIVE REPORT'} />
        {this.renderHeaderDetails()}
        <MainActionButton
          label={'PRINT'}
          onClick={this.doPrint}
        />
      </Layout.Content>
    );
  }
}

SoloReport.propTypes = {
  reportFrame: React.PropTypes.object.isRequired,
};

export default SoloReport;
