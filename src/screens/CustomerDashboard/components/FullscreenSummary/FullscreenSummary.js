import React from 'react';
// import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import FullscreenContainer from './FullscreenContainer';
import { fullscreenSummaryClasses } from './classes';

const FullScreenSummary = (/* props */) => {
  return (
    <FullscreenContainer>
      <div className={css(fullscreenSummaryClasses.content)}>
        summary
      </div>
    </FullscreenContainer>
  );
};

FullScreenSummary.propTypes = {};

export default FullScreenSummary;
