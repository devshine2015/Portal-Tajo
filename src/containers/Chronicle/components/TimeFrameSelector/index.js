import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import moment from 'moment';
import Period from 'containers/Report/components/Period';
import styles from './styles.css';
import { requestHistory } from './../../actions';

// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class TimeFrame extends React.Component {

  constructor(props) {
    super(props);
    this.defaultStartDate = moment().subtract(1, 'days').toDate();
    this.periodFields = {
      start: {
        name: 'start',
        default: this.defaultStartDate,
      },
      end: {
        name: 'end',
        default: undefined,
      },
      startTime: {
        name: 'startTime',
        default: this.defaultStartTime,
      },
      endTime: {
        name: 'endTime',
        default: this.defaultEndTime,
      },
    };

    this.state = {
      [this.periodFields.start.name]: this.periodFields.start.default,
      [this.periodFields.end.name]: this.periodFields.end.default,
      [this.periodFields.startTime.name]: this.periodFields.startTime.default,
      [this.periodFields.endTime.name]: this.periodFields.endTime.default,
    };

    this.onChange = this.onChange.bind(this);
  }


  onPeriodChange = (field, value) => {
//    this.props.swipeGeneratedData();
    this.onChange(field, value);
  }

  onChange(field, value) {
    // do nothing if field doesn't change
    if (this.state[field] === value) return;

    this.setState({
      [field]: value,
    });
  }

  getData(_this) {
    _this.props.requestHistory(_this.props.selectedVehicleId,
      _this.state[_this.periodFields.start.name]);
  }

  render() {
    return (
      <div className={styles.timeFrameBox}>
      <Period
        handlePeriodChange={this.onPeriodChange}
        fields={this.periodFields}
      />
        <RaisedButton
          onClick={ () => this.getData(this) }
          label="Get Data"
        />

      </div>
    );
  }
}

TimeFrame.propTypes = {
  selectedVehicleId: React.PropTypes.string.isRequired,
  requestHistory: React.PropTypes.func.isRequired,
};
const mapState = () => ({
});
const mapDispatch = {
  requestHistory,
};
const PureTimeFrame = pure(TimeFrame);
export default connect(mapState, mapDispatch)(PureTimeFrame);
