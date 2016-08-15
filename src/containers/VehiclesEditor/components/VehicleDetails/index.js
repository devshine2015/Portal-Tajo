import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Form from 'components/Form';
import styles from './styles.css';

const FORM = 'editor';

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial values for controlled inputs
     **/
    this.state = { ...props.details };
  }

  componentWillReceiveProps(nextProps) {
    this.checkIfVehicleChanged(nextProps);
  }

  /**
   * Just send state as data
   **/
  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSave(this.state);
  }

  /**
   * Update state[field] with value
   **/
  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value.trim(),
    });
  }

  /**
   * Update state if another vehicle has been chosen
   **/
  checkIfVehicleChanged(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ ...nextProps.details });
    }
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
            floatingLabelText="Vehicle Name"
            value={this.state.name}
          />
          <TextField
            fullWidth
            name="licensePlate"
            onChange={this.onChange}
            floatingLabelText="License Plate Number"
            value={this.state.licensePlate}
          />
          <TextField
            fullWidth
            name="make"
            onChange={this.onChange}
            floatingLabelText="Manufacturer"
            value={this.state.make}
          />
          <TextField
            fullWidth
            name="model"
            onChange={this.onChange}
            floatingLabelText="Model Name"
            value={this.state.model}
          />
          <TextField
            fullWidth
            name="year"
            onChange={this.onChange}
            floatingLabelText="Year of Manufacture"
            value={this.state.year}
          />
          <div className={styles.buttons}>
            <RaisedButton
              className={styles.buttons__button}
              disabled={this.props.disabled}
              onClick={this.onSubmit}
              label="Save"
              type="submit"
              primary
            />
            <FlatButton
              className={styles.buttons__button}
              onClick={this.props.onCancel}
              label="Cancel"
            />
          </div>
        </Form>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  // Id for detecting if vehicle and its details has been changed
  id: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  details: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    make: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired,
    licensePlate: React.PropTypes.string.isRequired,
  }).isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

export default pure(VehicleDetails);
