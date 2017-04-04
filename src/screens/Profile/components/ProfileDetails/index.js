import React from 'react';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui';
import Userpic from 'components/Userpic';
import Widget from 'components/Widget';
import PasswordForm from 'components/User/PasswordForm';
import Overlay from 'components/User/Overlay';
import Details from 'components/User/Details';
import { translate } from 'utils/i18n';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

const STYLES = {
  userpic: {
    width: 60,
    height: 60,
  },
};

class ProfileDetails extends React.PureComponent {

  state = {
    isOverlayActive: false,
  }

  openPasswordForm = () => {
    this.setState({
      isOverlayActive: true,
    });
  }

  closeForm = () => {
    this.setState({
      isOverlayActive: false,
    });
  }

  renderForm() {
    return (
      <PasswordForm
        onSubmit={this.closeForm}
        closeForm={this.closeForm}
        userId={this.props.profile.user_id}
      />
    );
  }

  render() {
    const { profile } = this.props;
    const name = profile.name || profile.nickname || profile.email;
    const { isOverlayActive } = this.state;
    const animation = `transition.bounce${(isOverlayActive ? 'In' : 'Out')}`;

    return (
      <Widget
        title={this.props.translations.profile}
        containerClass={classes.widgetContainer}
      >
        <div className={css(classes.cardContainer)}>
          <Card>
            <CardHeader
              avatar={<Userpic src={profile.picture} style={STYLES.userpic} />}
              title={name}
            />
            <CardText>
              <div className={css(classes.profileDetails)}>
                <Details.PasswordDetails openPasswordForm={this.openPasswordForm} />
              </div>
            </CardText>
          </Card>

          <VelocityComponent
            animation={animation}
            key="overlay"
            duration={500}
          >
            <Overlay>
              { this.renderForm() }
            </Overlay>
          </VelocityComponent>
        </div>
      </Widget>
    );
  }
}

ProfileDetails.propTypes = {
  profile: React.PropTypes.shape({
    user_id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    nickname: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    picture: React.PropTypes.string.isRequired,
  }).isRequired,

  translations: phrasesShape.isRequired,
};

ProfileDetails.defaultProps = {
  profile: {
    user_id: 'auth0|58d4d321bcce2e507193b3bf',
    name: 'max@drvr.co',
    nickname: 'max',
    email: 'max@drvr.co',
    picture: 'https://s.gravatar.com/avatar/ffeb9e60bf54d2089655636ae2b5cf3f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png',
  },
};

ProfileDetails.displayName = 'ProfileDetails';

export default translate(phrases)(ProfileDetails);
