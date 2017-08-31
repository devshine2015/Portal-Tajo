import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import Overlay from 'components/User/Overlay';
import Details from 'components/User/Details';
import PasswordForm from 'containers/User/PasswordFormConnected';
import EmailForm from '../EmailForm';

import classes from './classes';

const STYLES = {
  overlay: {
    bottom: -5,
  },
};

class UserItemDetails extends React.Component {

  state = {
    isEmailEditing: false,
    isPasswordEditing: false,
    isOverlayActive: false,
  }

  openEmailForm = () => {
    this.setState({
      isEmailEditing: true,
      isPasswordEditing: false,
      isOverlayActive: true,
    });
  }

  openPasswordForm = () => {
    this.setState({
      isEmailEditing: false,
      isPasswordEditing: true,
      isOverlayActive: true,
    });
  }

  closeForm = () => {
    this.setState({
      isEmailEditing: false,
      isPasswordEditing: false,
      isOverlayActive: false,
    });
  }

  renderForm = () => {
    const { isPasswordEditing, isEmailEditing } = this.state;

    if (isEmailEditing) {
      return (
        <EmailForm
          closeForm={this.closeForm}
          userId={this.props.profile.user_id}
        />
      );
    }

    if (isPasswordEditing) {
      return (
        <PasswordForm
          closeForm={this.closeForm}
          userId={this.props.profile.user_id}
        />
      );
    }

    return null;
  }

  render() {
    const { isOverlayActive } = this.state;
    const animation = `transition.bounce${(isOverlayActive ? 'In' : 'Out')}`;

    return (
      <div className={css(classes.details)}>
        <div className={css(classes.details__row)}>
          <div className={css(classes.details__col)}>
            <Details.EmailDetails
              email={this.props.profile.email}
              isVerified={this.props.profile.email_verified}
              openEmailForm={this.openEmailForm}
            />
          </div>
          <div className={css(classes.details__col)}>
            <Details.PasswordDetails openPasswordForm={this.openPasswordForm} />
          </div>

        </div>

        <VelocityComponent
          animation={animation}
          key="overlay"
          duration={500}
        >
          <Overlay style={STYLES.overlay}>
            { this.renderForm() }
          </Overlay>
        </VelocityComponent>

      </div>
    );
  }
}

UserItemDetails.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string.isRequired,
    email_verified: PropTypes.bool,
    user_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserItemDetails;
