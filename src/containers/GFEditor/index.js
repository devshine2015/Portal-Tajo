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

import styles from './styles.css';


const FORM = 'editor';

class GFEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  //
  // componentDidMount() {
  //   this.theLocation = makeLocalGF();
  // }

  componentDidUpdate() {
  }
  /**
   **/
  onSubmit = (e) => {
    e.preventDefault();
    const gfObj = makeBackendGF({ ...this.props.subjectGF });
    this.props.createGF(gfObj, 1)
      .then(() => {
        this.props.showSnackbar('Succesfully sended ✓', 3000);
      }, () => {
        this.props.showSnackbar('Something went wrong. Try later. ✓', 5000);
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
            floatingLabelText="Location Name"
            value={this.props.subjectGF.name}
          />
          <TextField
            fullWidth
            name="address"
            onChange={this.onChange}
            floatingLabelText="Address"
            value={this.props.subjectGF.address}
          />
          <TextField
            fullWidth
            name="radius"
            onChange={this.onChange}
            floatingLabelText="Radius"
            value={this.props.subjectGF.radius}
          />
          <Checkbox
            label="is home depo"
            onCheck={this.onCheckDepot}
          />
          <div className={styles.buttons}>
            <FlatButton
              className={styles.buttons__button}
              onClick={this.onCancel}
              label="Cancel"
            />
            <RaisedButton
              className={styles.buttons__button}
              onClick={this.onSubmit}
              label="Save"
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

export default connect(mapState, mapDispatch)(PureGFEditor);
