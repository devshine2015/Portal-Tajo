import React from 'react';
import FixedContent from 'components/FixedContent';
import AlertsFilter from '../AlertsFilter/AlertsFilter';
import AlertsTable from '../Table/Table';

const Content = () => {
  return (
    <FixedContent>
      <AlertsFilter />
      <AlertsTable />
    </FixedContent>
  );
};

export default Content;
