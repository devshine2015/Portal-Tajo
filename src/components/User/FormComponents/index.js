import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatButton,
  RaisedButton,
} from 'material-ui';
import { css } from 'aphrodite/no-important';
import { translate } from 'utils/i18n';

import classes from './classes';
import phrases, { phrasesShape } from './PropTypes';

const Header = ({ children, center }) => (
  <h3 className={css(classes.header, center && classes.header_center)}>
    { children }
  </h3>
);

Header.propTypes = {
  children: PropTypes.any.isRequired,
  center: PropTypes.bool,
};

Header.defaultProps = {
  center: false,
};

const Buttons = ({
  onSubmit,
  onCancel,
  disabled,
  mainLabel,
  rootStyles,
  translations,
}) => (
  <div
    className={css(classes.buttons)}
    style={rootStyles}
  >
    <RaisedButton
      onClick={onSubmit}
      label={mainLabel}
      type="submit"
      disabled={!disabled}
      primary
    />
    <FlatButton
      label={translations.cancel}
      type="reset"
      onClick={onCancel}
    />
  </div>
);

Buttons.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  mainLabel: PropTypes.string.isRequired,
  rootStyles: PropTypes.object,

  translations: phrasesShape.isRequired,
};

Buttons.defaultProps = {
  rootStyles: {},
};

const FormComponents = {
  Header,
  Buttons: translate(phrases)(Buttons),
};

export default FormComponents;
