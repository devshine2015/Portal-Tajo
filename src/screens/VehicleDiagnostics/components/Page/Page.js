import React from 'react';
import DealerPage, {
  DatavizFrame,
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';

class Page extends React.Component {
  render() {
    return (
      <DealerPage>
        <PowerList />
        <FixedContent
          style={{
            height: '100%',
          }}
        >
          <PageHeader text="Vehicle Diagnostic" onApply={() => this.forceUpdate()} />
          <DatavizFrame src="http://office.datavis.sg:30001/v1/5" />
        </FixedContent>
      </DealerPage>
    );
  }
};

export default Page;
