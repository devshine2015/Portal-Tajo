import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { summaryItemClasses } from './classes';

const SummaryGridItem = ({
  temp,
  name,
  speed,
  fuel,
  pos,
  updatedAt,
}) => {
  return (
    <div className={css(summaryItemClasses.item)}>
      <div className={css(summaryItemClasses.name)}>{name}</div>
      <div className={css(summaryItemClasses.pos)}>{`${pos.lat}, ${pos.lng}`}</div>
      <div className={css(summaryItemClasses.scores)}>
        <div className={css(summaryItemClasses.scores__col)}>
          <span className={css(summaryItemClasses.scores__title)}>Temp</span>
          <span className={css(summaryItemClasses.scores__val)}>{temp}</span>
        </div>
        <div className={css(summaryItemClasses.scores__col)}>
          <span className={css(summaryItemClasses.scores__title)}>Speed</span>
          <span className={css(summaryItemClasses.scores__val)}>{speed}</span>
        </div>
        <div className={css(summaryItemClasses.scores__col)}>
          <span className={css(summaryItemClasses.scores__title)}>Fuel</span>
          <span className={css(summaryItemClasses.scores__val)}>{fuel}</span>
        </div>
      </div>
      <div className={css(summaryItemClasses.time)}>
        {`Updated at ${updatedAt}`}
      </div>
    </div>
  );
};

SummaryGridItem.propTypes = {
  temp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  speed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  fuel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  pos: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  updatedAt: PropTypes.number.isRequired,
};

export default SummaryGridItem;
