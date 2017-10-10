import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import {
  Card,
  CardHeader,
  CardText,
} from 'material-ui';
import Userpic from 'components/Userpic';
import Widget from 'components/Widget';
import PasswordForm from 'containers/User/PasswordForm';
import Overlay from 'components/User/Overlay';
import Details from 'components/User/Details';
import { translate } from 'utils/i18n';
import { getProfileData } from 'services/Session/reducer';

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
        forCurrentUser
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
  profile: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,

  translations: phrasesShape.isRequired,
};

ProfileDetails.displayName = 'ProfileDetails';

const Translated = translate(phrases)(ProfileDetails);

const mapState = state => ({
  profile: getProfileData(state),
});

export default connect(mapState)(Translated);
