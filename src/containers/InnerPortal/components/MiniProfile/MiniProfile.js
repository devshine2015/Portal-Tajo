import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import Userpic from 'components/Userpic';
import classes from './classes';

const MiniProfile = ({
  picture,
  name,
  nickname,
  email,
}) => {
  return (
    <div className={css(classes.profile)}>
      <Userpic src={picture} className={css(classes.userpic)} size={50} />
      <span className={css(classes.text_welcome)}>welcome</span><br />
      <span className={css(classes.text_name)}>
        { nickname || name || email }
      </span>
    </div>
  );
};

MiniProfile.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default MiniProfile;
