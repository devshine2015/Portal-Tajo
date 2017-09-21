import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'aphrodite/no-important';
import classes from './classes';

const JobsFooter = ({
  updatedAt,
}) => {
  return (
    <div className={css(classes.footer)}>
      <span className={css(classes.updatedAt)}>
        { `Updated at: ${moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}` }
      </span>
    </div>
  );
};

JobsFooter.propTypes = {
  updatedAt: PropTypes.instanceOf(Date).isRequired,
};

export default JobsFooter;
