import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Layout from 'components/Layout';
import FormButtons from 'components/Controls/FormButtons';

import { createGF } from 'services/FleetModel/actions/gfActions';
import { showSnackbar } from 'containers/Snackbar/actions';
import { translate } from 'utils/i18n';

import { makeBackendGF,
  toggleDepotForGF } from 'services/FleetModel/utils/gfHelpers';
import { gfEditGetSubject } from './reducer';
import { gfEditClose, gfEditUpdate } from './actions';

import phrases, { phrasesShape } from './PropTypes';

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
   * */
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
      <Layout.Content>
        <TextField
          fullWidth
          name="name"
          onChange={this.onChange}
          floatingLabelText={this.props.translations.location_name}
          value={this.props.subjectGF.name}
        />
        <TextField
          fullWidth
          name="address"
          onChange={this.onChange}
          floatingLabelText={this.props.translations.address}
          value={this.props.subjectGF.address}
        />

        { this.props.subjectGF.isPolygon ? null :
        <TextField
          fullWidth
          name="radius"
          onChange={this.onChange}
          floatingLabelText={this.props.translations.radius}
          value={this.props.subjectGF.radius}
        />
        }
        { true ? null : (
          <Checkbox
            label={this.props.translations.home_depot}
            onCheck={this.onCheckDepot}
          />
        )}
        <FormButtons
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      </Layout.Content>
    );
  }
}

GFEditor.propTypes = {
  createGF: PropTypes.func.isRequired,
  gfEditClose: PropTypes.func.isRequired,
  gfEditUpdate: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  subjectGF: PropTypes.object,

  translations: phrasesShape.isRequired,
};

GFEditor.defaultProps = {
  subjectGF: {},
};

const mapState = state => ({
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

export default translate(phrases)(Connected);
