import React, { Component } from 'react';
import { css } from 'aphrodite/no-important';
import classes from './classes';

class JobsHeader extends Component {
  render() {
    return (
      <div className={css(classes.header)}>
        header
      </div>
    );
  }
}

JobsHeader.propTypes = {};

export default JobsHeader;
