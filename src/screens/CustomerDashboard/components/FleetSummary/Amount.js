import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';
import { WidgetPaper } from 'components/Widget';
import { amountClasses } from './classes';

const STYLES = {
  icon: {
    width: 40,
    height: 40,
  },
  widgetPaper: {
    width: '49%',
  },
};

const Amount = ({
  amount,
  helpText,
  icon,
}) => {
  return (
    <WidgetPaper style={STYLES.widgetPaper}>
      <div className={css(amountClasses.amount__inn)}>
        <div className={css(amountClasses.amount__icon)}>
          { React.cloneElement(icon, {
            style: STYLES.icon,
          }) }
        </div>
        <div className={css(amountClasses.amount__col)}>
          <div className={css(amountClasses.amount__title)}>
            { amount }
          </div>
          <div className={css(amountClasses.amount__help)}>
            { helpText }
          </div>
        </div>
      </div>
    </WidgetPaper>
  );
};

Amount.propTypes = {
  amount: PropTypes.number.isRequired,
  helpText: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default Amount;
