import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import Userpic from 'components/Userpic';
import classes, { size } from './classes';

const Avatar = ({
  src,
}) => {
  return (
    <div className={css(classes.avatar)}>
      <Userpic
        src={src}
        size={size}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Avatar;
