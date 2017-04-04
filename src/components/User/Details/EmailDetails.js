import React from 'react';
import { css } from 'aphrodite/no-important';
import RaisedButton from 'material-ui/RaisedButton';
import { translate } from 'utils/i18n';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

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
  isVerified: React.PropTypes.bool.isRequired,
  openEmailForm: React.PropTypes.func.isRequired,

  translations: phrasesShape.isRequired,
};

export default translate(phrases)(EmailDetails);
