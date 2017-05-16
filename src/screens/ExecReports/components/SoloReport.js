//
// one vehicle report
//
import React from 'react';
import Layout from 'components/Layout';
import Divider from 'material-ui/Divider';
import SoloHeader from './SoloHeader';
import SoloDetails from './SoloDetails';
import ReportMap from './ReportMap';

import MainActionButton from 'components/Controls/MainActionButton';

const printJSin = require('print.js/dist/print.min.js');
// import classes from './classes';

class SoloReport extends React.Component {

  printDiv = (divName) => {
    const printContents = document.getElementById(divName).innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  doPrint = () => {
    window.print();
    // this.printDiv('drvrSoloReport');
    // const asdf = printJS;
    // printJS('drvrSoloReport', 'html');
  }
  render() {
    return (
      <Layout.Content>
        <div id="drvrSoloReport" style={{ overflow: 'scroll' }}>
          {/* <Layout.Header label={'EXECUTIVE REPORT'} />*/}
          <table style={{ width: 600 }}>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th> 
              <th>Age</th>
            </tr>
            <tr>
              <td>Jill</td>
              <td>Smith</td> 
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td> 
              <td>94</td>
            </tr>
          </table>
          <SoloHeader vehicleId={this.props.vehicleId} />
          <SoloDetails vehicleId={this.props.vehicleId} />
          {/*<ReportMap reportFrame={this.props.reportFrame} />*/}
        </div>
        <MainActionButton
          label={'PRINT'}
          onClick={this.doPrint}
        />
      </Layout.Content>
    );
  }
}

SoloReport.propTypes = {
  vehicleId: React.PropTypes.string.isRequired,
  reportFrame: React.PropTypes.object.isRequired,
};

export default SoloReport;
