import React from 'react';
import { css } from 'aphrodite/no-important';
import RaisedButton from 'material-ui/RaisedButton';

import classes from './classes';

const UserItemDetails = ({
  profile,
}) => (
  <div className={css(classes.details)}>
    <dl className={css(classes.details__list)}>
      <div className={css(classes.details__item)}>
        <dt className={css(classes.details__col, classes.details__title)}>
          Email:
        </dt>

        <dd className={css(classes.details__col, classes.details__detail)}>
          { profile.email }
        </dd>
      </div>
      <div className={css(classes.details__item)}>
        <dt className={css(classes.details__col, classes.details__title)}>
          Password:
        </dt>

        <dd className={css(classes.details__col, classes.details__detail)}>
          ••••••<br />

          {/* available for clients admins */}
          <RaisedButton
            label="Reset password"
            className={css(classes.details__resetBtn)}
            secondary
          />
        </dd>
      </div>
    </dl>
  </div>
);

UserItemDetails.propTypes = {
  profile: React.PropTypes.shape({
    email: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default UserItemDetails;
