import React from 'react';
import { css } from 'aphrodite/no-important';
import RaisedButton from 'material-ui/RaisedButton';
import { VelocityComponent } from 'velocity-react';
import EmailForm from '../EmailForm';
import PasswordForm from '../PasswordForm';
import { translate } from 'utils/i18n';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

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

const EmailVerified = ({ text }) => (
  <span className={css(classes.verified)}>
    { text }
  </span>
);

EmailVerified.propTypes = {
  text: React.PropTypes.string.isRequired,
};

const EmailDetails = ({
  email,
  isVerified,
  openEmailForm,
  translations,
}) => (
  <div>
    <dt className={css(classes.details__title)}>
      {`${translations.email}:`}
    </dt>

    <dd className={css(classes.details__detail)}>
      { email }
      { isVerified ? <EmailVerified text={translations.verified} /> : null }
    </dd>
    <RaisedButton
      label={translations.change_email}
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

  translations: phrasesShape.isRequired,
};

const PasswordDetails = ({
  openPasswordForm,
  translations,
}) => (
  <div>
    <dt className={css(classes.details__title)}>
      {`${translations.password}:`}
    </dt>

    <dd className={css(classes.details__detail)}>
      ••••••••••
    </dd>
    <RaisedButton
      label={translations.change_password}
      secondary
      className={css(classes.details__button)}
      onClick={openPasswordForm}
    />
  </div>
);

PasswordDetails.propTypes = {
  openPasswordForm: React.PropTypes.func.isRequired,
  translations: phrasesShape.isRequired,
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
            <EmailDetails
              email={this.props.profile.email}
              isVerified={this.props.profile.email_verified}
              openEmailForm={this.openEmailForm}
              translations={this.props.translations}
            />
          </div>
          <div className={css(classes.details__col)}>
            <PasswordDetails
              openPasswordForm={this.openPasswordForm}
              translations={this.props.translations}
            />
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
    user_id: React.PropTypes.string.isRequired,
  }).isRequired,

  translations: phrasesShape.isRequired,
};

export default translate(phrases)(UserItemDetails);
