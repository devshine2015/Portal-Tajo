import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Form from 'components/Form';
import { makeBackendGF,
    toggleDepotForGF } from 'services/FleetModel/utils/gfHelpers';
import { gfEditGetSubject } from './reducer';
import { gfEditClose, gfEditUpdate } from './actions';
import { createGF } from 'services/FleetModel/actions/gfActions';
import { showSnackbar } from 'containers/Snackbar/actions';
import translator from 'utils/translator';

import styles from './styles.css';
import phrases, { phrasesShape } from './phrases.lang';

const FORM = 'editor';

class GFEditor extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();

    const gfObj = makeBackendGF({ ...this.props.subjectGF });

    this.props.createGF(gfObj, 1)
      .then(() => {
        this.props.showSnackbar(this.props.translations.send_success, 3000);
      }, () => {
        this.props.showSnackbar(this.props.translations.send_fail, 5000);
      });
    this.props.gfEditClose();
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.gfEditClose();
  }
  /**
   **/
  onChange = (e, value) => {
    const field = e.target.name;
    this.props.subjectGF[field] = value;
    this.props.gfEditUpdate(this.props.subjectGF);
  }

  onCheckDepot = (e, isChecked) => {
    toggleDepotForGF(this.props.subjectGF, isChecked);
    this.props.gfEditUpdate(this.props.subjectGF);
  }

  render() {
    return (
      <div className={styles.editor}>
        <Form
          name={FORM}
          onSubmit={this.onSubmit}
        >
          <TextField
            fullWidth
            name="name"
            onChange={this.onChange}
            floatingLabelText={ this.props.translations.location_name }
            value={this.props.subjectGF.name}
          />
          <TextField
            fullWidth
            name="address"
            onChange={this.onChange}
            floatingLabelText={ this.props.translations.address }
            value={this.props.subjectGF.address}
          />

          { this.props.subjectGF.isPolygon ? null :
            <TextField
              fullWidth
              name="radius"
              onChange={this.onChange}
              floatingLabelText={ this.props.translations.radius }
              value={this.props.subjectGF.radius}
            />
          }

          { true ? null : (
            <Checkbox
              label={ this.props.translations.home_depot }
              onCheck={this.onCheckDepot}
            />
          )}

          <div className={styles.buttons}>
            <FlatButton
              className={styles.buttons__button}
              onClick={this.onCancel}
              label={ this.props.translations.cancel }
            />
            <RaisedButton
              className={styles.buttons__button}
              onClick={this.onSubmit}
              label={ this.props.translations.save }
              type="submit"
              primary
            />
          </div>

        </Form>
      </div>
    );
  }
}

GFEditor.propTypes = {
  createGF: React.PropTypes.func.isRequired,
  gfEditClose: React.PropTypes.func.isRequired,
  gfEditUpdate: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  subjectGF: React.PropTypes.object.isRequired,

  translations: phrasesShape.isRequired,
};

const mapState = (state) => ({
  subjectGF: gfEditGetSubject(state),
});
const mapDispatch = {
  createGF,
  showSnackbar,
  gfEditClose,
  gfEditUpdate,
};

const PureGFEditor = pure(GFEditor);
const Connected = connect(mapState, mapDispatch)(PureGFEditor);

export default translator(phrases)(Connected);
