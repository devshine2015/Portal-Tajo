import React from 'react';
import { isSCC } from 'configs';
import Profile from '../MiniProfile';
import Journal from '../Journal';

const AppBarRightElement = () => {
  return (
    <div>
      {isSCC && <Journal />}
      <Profile />
    </div>
  );
};

AppBarRightElement.propTypes = {};

export default AppBarRightElement;
