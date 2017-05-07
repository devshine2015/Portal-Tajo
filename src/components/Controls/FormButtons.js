import React from 'react';
import {
  FlatButton,
  RaisedButton,
} from 'material-ui';
import { css } from 'aphrodite/no-important';

import classes from './classes';


const FormButtons = ({
  onSubmit,
  onCancel,
  submitDisabled,
  submitLabel,
  cancelLabel,
  rootStyles,
  isDisabled,
}, context) => (
  <div
    className={css(classes.form_buttons)}
    style={rootStyles}
  >
    <FlatButton
      label={context.translator.getTranslation(cancelLabel)}
      type="reset"
      onClick={onCancel}
      disabled={isDisabled}
    />
    <RaisedButton
      onClick={onSubmit}
      label={context.translator.getTranslation(submitLabel)}
      type="submit"
      disabled={submitDisabled || isDisabled}
      primary
    />
  </div>
);

FormButtons.contextTypes = {
  translator: React.PropTypes.object.isRequired,
};

FormButtons.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  submitLabel: React.PropTypes.string,
  cancelLabel: React.PropTypes.string,
  submitDisabled: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool,
  rootStyles: React.PropTypes.object,
};

FormButtons.defaultProps = {
  rootStyles: {},
  submitLabel: 'save',
  cancelLabel: 'cancel',
  submitDisabled: false,
  isDisabled: false,
};

export default FormButtons;
