import React from 'react';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import AnimatedLogo from 'components/animated';
import FormComponents from '../FormComponents';
import { translate } from 'utils/i18n';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

const DetailPopupForm = ({
  children,
  headerText,
  isFetching,
  translations,
}) => {
  const animation = `transition.flipX${(isFetching ? 'In' : 'Out')}`;

  return (
    <div className={css(classes.form)}>
      <form>
        <FormComponents.Header center>
          { headerText }
        </FormComponents.Header>

        { children }
      </form>

      <VelocityComponent
        animation={animation}
        duration={300}
      >
        <div className={css(classes.loaderWrapper)}>
          <AnimatedLogo.LoadingLogo loadingText={`${translations.changing}...`} />
        </div>
      </VelocityComponent>
    </div>
  );
};

DetailPopupForm.propTypes = {
  headerText: React.PropTypes.string.isRequired,
  children: React.PropTypes.any.isRequired,
  isFetching: React.PropTypes.bool.isRequired,

  translations: phrasesShape.isRequired,
};

export default translate(phrases)(DetailPopupForm);
