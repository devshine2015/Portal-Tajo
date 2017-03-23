import React from 'react';
import {
  FlatButton,
  RaisedButton,
} from 'material-ui';
import { css } from 'aphrodite/no-important';

import classes from './classes';

const Header = ({ children, center }) => (
  <h3 className={css(classes.header, center && classes.header_center)}>
    { children }
  </h3>
);

Header.propTypes = {
  children: React.PropTypes.any.isRequired,
  center: React.PropTypes.bool,
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
      label="Cancel"
      type="reset"
      onClick={onCancel}
    />
  </div>
);

Buttons.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  mainLabel: React.PropTypes.string.isRequired,
  rootStyles: React.PropTypes.object,
};

const FormComponents = {
  Header,
  Buttons,
};


export default FormComponents;
