import React from 'react';
import { css } from 'aphrodite/no-important';
import RaisedButton from 'material-ui/RaisedButton';
import { VelocityComponent } from 'velocity-react';
import EmailForm from '../EmailForm';
import PasswordForm from '../PasswordForm';

import classes from './classes';

const Overlay = ({ children }) => (
  <div className={css(classes.overlay)}>
    <div className={css(classes.overlay__inn)}>
      { children }
    </div>
  </div>
);

Overlay.propTypes = {
  children: React.PropTypes.any,
};

const EmailVerified = () => (
  <span className={css(classes.verified)}>
    verified
  </span>
);

const EmailDetails = ({
  email,
  isVerified,
  openEmailForm,
}) => (
  <div>
    <dt className={css(classes.details__title)}>
      Email:
    </dt>

    <dd className={css(classes.details__detail)}>
      { email }
      { isVerified ? <EmailVerified /> : null }
    </dd>
    <RaisedButton
      label="Change email"
      secondary
      className={css(classes.details__button)}
      onClick={openEmailForm}
    />
  </div>
);

EmailDetails.propTypes = {
  email: React.PropTypes.string.isRequired,
  isVerified: React.PropTypes.bool,
  openEmailForm: React.PropTypes.func.isRequired,
};

const PasswordDetails = ({ openPasswordForm }) => (
  <div>
    <dt className={css(classes.details__title)}>
      Password:
    </dt>

    <dd className={css(classes.details__detail)}>
      ••••••••••
    </dd>
    <RaisedButton
      label="Change password"
      secondary
      className={css(classes.details__button)}
      onClick={openPasswordForm}
    />
  </div>
);

PasswordDetails.propTypes = {
  openPasswordForm: React.PropTypes.func.isRequired,
};

PasswordDetails.propTypes = {};

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
          onSubmit={this.closeForm}
          onCancel={this.closeForm}
        />
      );
    }

    if (isPasswordEditing) {
      return (
        <PasswordForm
          onSubmit={this.closeForm}
          onCancel={this.closeForm}
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
            <EmailDetails
              email={this.props.profile.email}
              isVerified={this.props.profile.email_verified}
              openEmailForm={this.openEmailForm}
            />
          </div>
          <div className={css(classes.details__col)}>
            <PasswordDetails openPasswordForm={this.openPasswordForm} />
          </div>

        </div>

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
    );
  }
}

UserItemDetails.propTypes = {
  profile: React.PropTypes.shape({
    email: React.PropTypes.string.isRequired,
    email_verified: React.PropTypes.bool,
  }).isRequired,
};

export default UserItemDetails;
