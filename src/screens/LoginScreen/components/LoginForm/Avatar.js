import React, { PropTypes } from 'react';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import Userpic from 'components/Userpic';
import {
  avatarClasses,
  AVATAR_SIZE,
} from './classes';

const Avatar = ({
  src,
  show,
}) => {
  const animation = `transition.expand${show ? 'In' : 'Out'}`;

  return (
    <VelocityComponent
      animation={animation}
      duration={300}
    >
      <div className={css(avatarClasses.avatar)}>
        <Userpic
          src={src}
          size={AVATAR_SIZE}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </VelocityComponent>
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Avatar;
