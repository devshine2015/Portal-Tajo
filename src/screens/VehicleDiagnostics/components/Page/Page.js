import React from 'react';
import DealerPage, {
  DatavizFrame,
  PowerList,
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
        <DatavizFrame
          title="Vehicle Diagnostics"
          src="http://office.datavis.sg:30001/v1/5"
        />
      </FixedContent>
    </DealerPage>
  );
};

export default Page;
