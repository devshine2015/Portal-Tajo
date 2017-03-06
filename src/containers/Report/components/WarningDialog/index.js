import React from 'react';
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
  onCancel: React.PropTypes.func.isRequired,

  // fired by clicking on OK button
  onOk: React.PropTypes.func.isRequired,

  // Controls whether the Dialog is opened or not.
  open: React.PropTypes.bool.isRequired,

  // amount of selected vehicles
  vehiclesAmount: React.PropTypes.number.isRequired,

  translations: phrasesShape.isRequired,
};

export default translate(phrases)(WarningDialog);
