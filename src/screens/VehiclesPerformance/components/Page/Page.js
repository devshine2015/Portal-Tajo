import React, { Component } from 'react';
import DealerPage, {
  DatavizFrame,
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';
// import PropTypes from 'prop-types';

class Page extends Component {
  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={() => this.forceUpdate()} />
        <FixedContent>
          <PageHeader text="Vehicle Performance" onApply={() => this.forceUpdate()} />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={1400}
            src="http://office.datavis.sg:30001/v1/1"
            title="Pedal usage and Break Control"
          />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={975}
            src="http://office.datavis.sg:30001/v1/2"
            title="Trip Information"
          />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={2056}
            src="http://office.datavis.sg:30001/v1/3"
            title="Score Card Report"
          />
          <DatavizFrame
            collapsible
            collapsed
            maxHeight={1685}
            src="http://office.datavis.sg:30001/v1/4"
            title="High RPM relating to gear shifting use"
          />
        </FixedContent>
      </DealerPage>
    );
  }
}

export default Page;
