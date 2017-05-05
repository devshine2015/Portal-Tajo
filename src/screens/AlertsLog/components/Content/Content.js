import React from 'react';
import { css } from 'aphrodite/no-important';
import FixedContent from 'components/FixedContent';
import AlertsFilter from '../AlertsFilter/AlertsFilter';
import AlertsTable from '../Table/Table';
import classes from './classes';

const Content = () => {
  return (
    <FixedContent containerClassName={css(classes.contentWrapper)}>
      <AlertsFilter />
      <AlertsTable />
    </FixedContent>
  );
};

export default Content;
