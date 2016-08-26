import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Form from 'components/Form';
import * as gfEditEvents from './events';
import * as mapEditEvents from 'containers/MapFleet/components/EditGF/events';
import { makeLocalGF, makeBackendGF } from 'services/FleetModel/utils/gfHelpers';
import { createGF } from 'services/FleetModel/actions/gfActions';
import { showSnackbar } from 'containers/Snackbar/actions';

import styles from './styles.css';


const FORM = 'editor';

class GFEditor extends React.Component {
  constructor(props) {
    super(props);

    if (props.subjectContext.obj === null) {
      this.subjectGF = makeLocalGF(props.subjectContext.pos);
    } else {
      this.subjectGF = props.subjectContext.obj;
    }
    /**
     * Initial values for controlled inputs
     **/
    this.state = {
      name: this.subjectGF.name,
      address: this.subjectGF.address,
      pos: this.subjectGF.pos,
      radius: this.subjectGF.radius,
    };

    this.props.eventDispatcher.registerHandler(mapEditEvents.MAP_EDITGF_SIZE,
      ((meThis) => (newR) => { meThis.setRadius(newR); })(this));
    this.props.eventDispatcher.registerHandler(mapEditEvents.MAP_EDITGF_MOVE,
      ((meThis) => (newLatLng) => { meThis.setPos(newLatLng); })(this));
  }
  //
  // componentDidMount() {
  //   this.theLocation = makeLocalGF();
  // }

  // componentWillReceiveProps(nextProps) {
  // }

  /**
   * Just send state as data
   **/
  onSubmit = (e) => {
    e.preventDefault();
    this.props.eventDispatcher.fireEvent(gfEditEvents.GF_EDITOR_CLOSE, null);
    const gfObj = makeBackendGF({ ...this.state });
    this.props.createGF(gfObj, 1)
      .then(() => {
        this.props.showSnackbar('Succesfully sended ✓', 3000);
      }, () => {
        this.props.showSnackbar('Something went wrong. Try later. ✓', 5000);
      });
  }

  onCancel = (e) => {
    e.preventDefault();
    this.props.eventDispatcher.fireEvent(gfEditEvents.GF_EDITOR_CLOSE, null);
  }
  /**
   * Update state[field] with value
   **/
  onChange = (e, value) => {
    const field = e.target.name;
    this.setState({
      [field]: value, // .trim(),
    });
    if (field === 'radius') {
      this.props.eventDispatcher.fireEvent(gfEditEvents.GF_EDITOR_RADIUS, value);
    }
  }
  setRadius(newR) {
    this.setState({
      radius: Math.round(newR),
    });
  }
  setPos(latLng) {
    this.setState({
      pos: latLng,
    });
  }

  render() {
    return (
      <div className={styles.details}>
        <Form
          name={FORM}
          onSubmit={this.onSubmit}
        >
          <TextField
            fullWidth
            name="name"
            onChange={this.onChange}
            floatingLabelText="Location Name"
            value={this.state.name}
          />
          <TextField
            fullWidth
            name="address"
            onChange={this.onChange}
            floatingLabelText="Address"
            value={this.state.address}
          />
          <TextField
            fullWidth
            name="radius"
            onChange={this.onChange}
            floatingLabelText="Radius"
            value={this.state.radius}
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
  eventDispatcher: React.PropTypes.object.isRequired,
  subjectContext: React.PropTypes.object.isRequired,  // what are we editing/creating - passed here
  createGF: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};

const mapState = () => ({});
const mapDispatch = {
  createGF,
  showSnackbar,
};

const PureGFEditor = pure(GFEditor);

export default connect(mapState, mapDispatch)(PureGFEditor);
