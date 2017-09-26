import React, { Component } from 'react';
import DealerPage, {
  DatavizFrame,
  PowerList,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';
// import PropTypes from 'prop-types';

class Page extends Component {
  state = {
    vehicleId: undefined,
  };

  switchVehicle = (id) => {
    this.setState({
      vehicleId: id,
    });
  }

  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={this.switchVehicle} />
        <FixedContent>
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={1400}
            src="http://office.datavis.sg:30001/v1/1"
            title="Vehicle Performance Pedal usage and Break Control (Vehicle level)"
          />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={975}
            src="http://office.datavis.sg:30001/v1/2"
            title="Vehicle Performance Trip Information (vehicle Level)"
          />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={2056}
            src="http://office.datavis.sg:30001/v1/3"
            title="Vehicle Performance score-card Report Table for Individual (vehicle Level)"
          />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={1685}
            src="http://office.datavis.sg:30001/v1/4"
            title="Vehicle Performance High RPM relating to gear shifting use (Vehicle level)"
          />
        </FixedContent>
      </DealerPage>
    );
  }
}

export default Page;
