import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import FullscreenContainer from './FullscreenContainer';
import SummaryGridItem from './SummaryItem';
import {
  fullscreenSummaryClasses,
  summaryGridClasses,
} from './classes';

const SummaryGrid = ({ vehiclesList = [] }) => {
  const vehicles = vehiclesList.map(v => (
    <li
      key={v.id}
      className={css(summaryGridClasses.gridItem)}
    >
      <SummaryGridItem {...v} />
    </li>
  ));

  return (
    <ul className={css(summaryGridClasses.grid)}>
      { vehicles }
    </ul>
  );
};

SummaryGrid.propTypes = {
  vehiclesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const FullScreenSummary = (props) => {
  return (
    <FullscreenContainer>
      <div className={css(fullscreenSummaryClasses.content)}>
        <SummaryGrid vehiclesList={props.vehicles} />
      </div>
    </FullscreenContainer>
  );
};

FullScreenSummary.propTypes = {
  vehicles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FullScreenSummary;
