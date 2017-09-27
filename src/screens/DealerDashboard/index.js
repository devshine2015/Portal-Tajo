import React from 'react';
import DealerPage, { DatavizFrame, PageHeader } from 'containers/DealerPage';

class DealerDashboard extends React.Component {
  render() {
    return (
      <DealerPage>
        <PageHeader text="Fleet Overview" onApply={() => this.forceUpdate()} />
        <DatavizFrame src="http://office.datavis.sg:30001/" />
      </DealerPage>
    );
  }
};

export default DealerDashboard;
