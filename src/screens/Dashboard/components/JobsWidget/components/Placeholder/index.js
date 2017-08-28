import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const Placeholder = ({
  translations,
}) => {
  return (
    <div className={css(classes.placeholder)}>
      { translations.no_active_jobs }
    </div>
  );
};

Placeholder.propTypes = {
  translations: PropTypes.shape({
    no_active_jobs: PropTypes.string.isRequired,
  }),
};

Placeholder.defaultProps = {
  translations: {
    no_active_jobs: 'no active jobs',
  },
};

export default Placeholder;
