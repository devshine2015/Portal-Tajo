import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  FlatButton,
} from 'material-ui';
import { translate } from 'utils/i18n';

import phrases, { phrasesShape } from './PropTypes';

function actions(props) {
  return [
    <FlatButton
      label={ props.translations.cancel }
      keyboardFocused
      onTouchTap={props.onCancel}
    />,
    <FlatButton
      primary
      label={ props.translations.ok }
      onTouchTap={props.onOk}
    />,
  ];
}

const WarningDialog = (props) => (
  <div>
    <Dialog
      title={ props.translations.warn_title }
      actions={actions(props)}
      open={props.open}
      onRequestClose={props.onCancel}
    >
      { props.translations.warn_text }
    </Dialog>
  </div>
);

WarningDialog.propTypes = {
  // fired by clicking on Cancel button or
  // outside of dialog
  onCancel: PropTypes.func.isRequired,

  // fired by clicking on OK button
  onOk: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types

  // Controls whether the Dialog is opened or not.
  open: PropTypes.bool.isRequired,

  translations: phrasesShape.isRequired,
};

export default translate(phrases)(WarningDialog);
