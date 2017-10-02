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

const FullScreenSummary = (/* props */) => {
  return (
    <FullscreenContainer>
      <div className={css(fullscreenSummaryClasses.content)}>
        <SummaryGrid
          vehiclesList={[{
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }, {
            id: 1,
            name: 'Vehicle 1',
            pos: { lat: 1.2131312, lng: 2.42435566 },
            temp: +33.2,
            fuel: 122,
            speed: 12,
            updatedAt: Date.now(),
          }]}
        />
      </div>
    </FullscreenContainer>
  );
};

FullScreenSummary.propTypes = {};

export default FullScreenSummary;
