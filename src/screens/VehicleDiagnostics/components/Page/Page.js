import React from 'react';
import DealerPage, {
  DatavizFrame,
  PowerList,
  PageHeader,
} from 'containers/DealerPage';
import FixedContent from 'components/FixedContent';

const Page = () => {
  return (
    <DealerPage>
      <PowerList />
      <FixedContent
        style={{
          height: '100%',
        }}
      >
        <PageHeader text="Vehicle Diagnostic" />
        <DatavizFrame src="http://office.datavis.sg:30001/v1/5" />
      </FixedContent>
    </DealerPage>
  );
};

export default Page;
