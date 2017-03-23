import React from 'react';
import { css } from 'aphrodite/no-important';
import { VelocityComponent } from 'velocity-react';
import AnimatedLoadingLogo from 'components/animated';
import FormComponents from '../FormComponents';

import classes from './classes';

const DetailPopupForm = ({
  children,
  headerText,
  isFetching,
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
          <AnimatedLoadingLogo loadingText="changing..." />
        </div>
      </VelocityComponent>
    </div>
  );
};

DetailPopupForm.propTypes = {
  headerText: React.PropTypes.string.isRequired,
  children: React.PropTypes.any.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
};

export default DetailPopupForm;
