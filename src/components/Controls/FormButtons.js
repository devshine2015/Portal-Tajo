import React from 'react';
import PropTypes from 'prop-types';
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
  translator: PropTypes.object.isRequired,
};

FormButtons.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  submitDisabled: PropTypes.bool,
  isDisabled: PropTypes.bool,
  rootStyles: PropTypes.object,
};

FormButtons.defaultProps = {
  rootStyles: {},
  submitLabel: 'save',
  cancelLabel: 'cancel',
  submitDisabled: false,
  isDisabled: false,
};

export default FormButtons;
