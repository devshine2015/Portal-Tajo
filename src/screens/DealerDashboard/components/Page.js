import React from 'react';
import DealerPage, { PageHeader } from 'containers/DealerPage';

import Layout from 'components/Layout';
import DashboardElements from 'components/DashboardElements';

import FuelConsumption from './FuelConsumption';

class DealerDashboard extends React.Component {
  render() {
    return (
      <DealerPage>
        <PageHeader text="Fleet Overview" onApply={() => this.forceUpdate()} />
        {/* containerClass={classes.widgetContainer} */}
        <Layout.Content style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <DashboardElements.DataCard
            title={'Number of Vehicles'}
            dataString={'36'}
          />
          <DashboardElements.DataCard
            title={'Toal Distance Traveled'}
            dataString={'22373 km'}
          />
          <DashboardElements.DataCard
            title={'Avg Speed'}
            dataString={'67 km/h'}
          />
          <DashboardElements.DataCard
            title={'Toal Running Time'}
            dataString={'2538 hrs'}
          />
          <DashboardElements.DataCard
            title={'Toal Running Time'}
            dataString={'2538 hrs'}
          />
          <DashboardElements.DataCard
            title={'Toal Driving Time'}
            dataString={'1452 hrs'}
          />
          <DashboardElements.DataCard
            title={'Toal Idle Time'}
            dataString={'195 hrs'}
          />
          <FuelConsumption />
          <DashboardElements.PieChart
            key="alerts"
          />
        </Layout.Content>
      </DealerPage>
    );
  }
}

export default DealerDashboard;
