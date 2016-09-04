import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
// import moment from 'moment';
// import Period from 'containers/Report/components/Period';
import styles from './styles.css';
import { requestHistory, setChronicleTimeFrame,
    validateChronicleTimeFrame } from './../../actions';

class TimeFrame extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fromDate: new Date(),
    };

//    this.onChange = this.onChange.bind(this);
  }

  fromDateChange = (event, date) => {
    this.setState({
      fromDate: date,
    });
    const toDate = new Date(date);
    toDate.setDate(toDate.getDate() + 1);
    this.props.setChronicleTimeFrame(date, toDate);
    this.props.validateChronicleTimeFrame();
  };

  render() {
    return (
      <div className={styles.timeFrameBox}>
      <DatePicker
        autoOk
        hintText="Controlled Date Input"
        value={this.state.fromDate}
        onChange={this.fromDateChange}
      />
      </div>
    );
  }
}

TimeFrame.propTypes = {
  selectedVehicleId: React.PropTypes.string,
  requestHistory: React.PropTypes.func.isRequired,
  setChronicleTimeFrame: React.PropTypes.func.isRequired,
  validateChronicleTimeFrame: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  requestHistory,
  setChronicleTimeFrame,
  validateChronicleTimeFrame,
};
const PureTimeFrame = pure(TimeFrame);
export default connect(mapState, mapDispatch)(PureTimeFrame);
