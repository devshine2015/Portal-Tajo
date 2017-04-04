import React from 'react';
import { css } from 'aphrodite/no-important';
import Userpic from 'components/Userpic';
import Widget from 'components/Widget';

import classes from './classes';

const STYLES = {
  userpic: {
    width: 60,
    height: 60,
  },
};

class ProfileDetails extends React.PureComponent {
  render() {
    const { profile } = this.props;
    const name = profile.name ||profile.nickname || profile.email;

    return (
      <Widget
        title="My Profile"
        // containerClass=
      >
        <div className="details">
          <div className="details__userpic">
            <Userpic src={profile.picture} style={STYLES.userpic} />
          </div>
          <div className="details__info">
            <h4 className="details__name">
              {name}
            </h4>
          </div>
        </div>
      </Widget>
    );
  }
}

ProfileDetails.propTypes = {
  profile: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    nickname: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    picture: React.PropTypes.string.isRequired,
  }).isRequired,
};

ProfileDetails.defaultProps = {
  profile: {
    name: 'max@drvr.co',
    nickname: 'max',
    email: 'max@drvr.co',
    picture: 'https://s.gravatar.com/avatar/ffeb9e60bf54d2089655636ae2b5cf3f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
  },
};

ProfileDetails.displayName = 'ProfileDetails';

export default ProfileDetails;
