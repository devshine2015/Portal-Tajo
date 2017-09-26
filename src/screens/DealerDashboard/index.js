import React from 'react';
import DealerPage, { DatavizFrame } from 'containers/DealerPage';

const DealerDashboard = () => {
  return (
    <DealerPage>
      <DatavizFrame
        title="Overview Fleet Dashboard"
        src="http://office.datavis.sg:30001/"
      />
    </DealerPage>
  );
};

export default DealerDashboard;
