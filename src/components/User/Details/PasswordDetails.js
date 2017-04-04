import React from 'react';
import { css } from 'aphrodite/no-important';
import RaisedButton from 'material-ui/RaisedButton';
import { translate } from 'utils/i18n';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

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

export default translate(phrases)(PasswordDetails);
