import React from 'react';
import DealerPage, {
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';
import ComingSoon from 'components/ComingSoon/ComingSoon';

class Page extends React.Component {
  render() {
    return (
      <DealerPage>
        <PowerList onVehicleSelect={() => this.forceUpdate()} />
        <FixedContent
          style={{
            height: '100%',
          }}
        >
          <PageHeader text="Fuel Usage" onApply={() => this.forceUpdate()} />
          <ComingSoon />
        </FixedContent>
      </DealerPage>
    );
  }
}

export default Page;
