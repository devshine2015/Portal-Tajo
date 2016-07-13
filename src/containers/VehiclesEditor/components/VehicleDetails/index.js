import React from 'react';
import pure from 'recompose/pure';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Form from 'components/Form';
import styles from './styles.css';

const FORM = 'editor';

class VehicleDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props.details };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ ...nextProps.details });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSave(this.state);
  }

  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value.trim(),
    });
  }

  render() {
    return (
      <div className={styles.details}>
        <Form
          name={FORM}
          onSubmit={this.onSubmit}
          refs={FORM}
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
          <RaisedButton
            onClick={this.onSubmit}
            label="Save"
            type="submit"
            primary
          />
        </Form>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
  details: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    make: React.PropTypes.string.isRequired,
    model: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired,
    licensePlate: React.PropTypes.string.isRequired,
  }).isRequired,
  onSave: React.PropTypes.func.isRequired,
};

export default pure(VehicleDetails);
