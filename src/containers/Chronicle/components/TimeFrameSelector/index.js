import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
// import moment from 'moment';
// import Period from 'containers/Report/components/Period';
import styles from './styles.css';
import { setChronicleTimeFrame } from './../../actions';

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
  };

  render() {
    return (
      <div className={styles.timeFrameBox}>
        <div>
          <DatePicker
            autoOk
            hintText="Controlled Date Input"
            value={this.state.fromDate}
            onChange={this.fromDateChange}
          />
        </div>
        <div>
        select date here
        </div>
      </div>
    );
  }
}

TimeFrame.propTypes = {
  setChronicleTimeFrame: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  setChronicleTimeFrame,
};
const PureTimeFrame = pure(TimeFrame);
export default connect(mapState, mapDispatch)(PureTimeFrame);
