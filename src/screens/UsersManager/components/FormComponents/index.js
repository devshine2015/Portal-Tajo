import React from 'react';
import {
  FlatButton,
  RaisedButton,
} from 'material-ui';
import { css } from 'aphrodite/no-important';

import classes from './classes';

const Header = ({ children }) => (
  <h3 className={css(classes.header)}>
    { children }
  </h3>
);

Header.propTypes = {
  children: React.PropTypes.any.isRequired,
};

const Buttons = ({
  onSubmit,
  onCancel,
  disabled,
  mainLabel,
}) => (
  <div className={css(classes.buttons)}>
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
};

const FormComponents = {
  Header,
  Buttons,
};


export default FormComponents;
