import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { css, StyleSheet } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { TextField, Paper, RaisedButton } from 'material-ui';
import { createSubFleet, fetchSubFleets } from 'services/Fleets/actions/subFleetActions';
import { showSnackbar } from 'containers/Snackbar/actions';
import Layout from 'components/Layout';

const classes = StyleSheet.create({
  formWrapper__inn: {
    padding: 12,
    margin: '0 auto',
    paddingBottom: 12,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  theBtn: {
    alignSelf: 'flex-end',
    // textAlign: 'center',
    // margin: '10px 0',
  },
});

class SubFleetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { subFleetName: '' };
  }

  onChange = (e, value) => {
    const field = e.target.name;

    this.setState({
      [field]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const subFleetData = {
      name: this.state.subFleetName,
      status: 'active',
    };

    this.props.createSubFleet(subFleetData)
      .then(() => {
        this.props.showSnackbar('SubFleet Added', 3000);
        this.props.fetchSubFleets();
      }, () => {
        this.props.showSnackbar('SubFleet Fail', 5000);
      });
    // this.props.closeForm();
  }

  onCancel = () => {
    // this.props.closeForm();
  }

  // postNew = (newAlert) => {

  //   this.props.createSubFleet(gfObj, 1)
  //   .then(() => {
  //     this.props.showSnackbar('SubFleet Added', 3000);
  //   }, () => {
  //     this.props.showSnackbar('SubFleet Fail', 5000);
  //   });

  //   // .then(() => {
  //   //   showSnackbar(translations.new_alert_condition_created_successfully, 3000);
  //   // }, () => {
  //   //   showSnackbar(translations.failed_to_create_new_alert_condition, 5000);
  //   // });
  // }

  render() {
    return (
      <Paper zDepth={1} className={css(classes.formWrapper__inn)} style={{ backgroundColor: '#dee3f0' }}>
        {this.newAlert && <Layout.Header
          label="new SubFLeet"
          style={{ padding: '0'}}
          labelStyle={{ fontSize: 16,
            color: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        }
        <TextField
          fullWidth
          key="subFleetName"
          name="subFleetName"
          onChange={this.onChange}
          floatingLabelText="SubFleet Name"
          value={this.state.subFleetName}
        />
        <RaisedButton
          className={css(classes.theBtn)}
          onClick={this.onSubmit}
          label="CREATE SUBFLEET"
          type="submit"
          primary
        />
      </Paper>
    );
  }
}

SubFleetForm.propTypes = {
  // alert: PropTypes.object,
  // closeForm: PropTypes.func.isRequired,
  createSubFleet: PropTypes.func.isRequired,
  fetchSubFleets: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
};

// SubFleetForm.defaultProps = {
//   alert: undefined,
// };

const mapState = null;

const mapDispatch = {
  createSubFleet,
  fetchSubFleets,
  showSnackbar,
};

export default connect(mapState, mapDispatch)(pure(SubFleetForm));

// export default pure(SpeedForm);
