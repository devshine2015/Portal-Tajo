import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { vehicleShape } from 'services/FleetModel/PropTypes';

import LinearProgress from 'material-ui/LinearProgress';

import { contextActions } from 'services/Global/actions';
import { requestSoloReport } from 'screens/ExecReports/services/actions';
import { getExecTimeFrame, getInstanceExecReportFrameById } from 'screens/ExecReports/services/reducer';


import stylesTop from '../styles.css';
import styles from './styles.css';
import { historyDetailsShape } from '../PropTypes';

class ChronicleListItem extends React.Component {
  onClick = () => {
    this.props.selectVehicle(this.props.id);
    const chronicleFrame = this.props.getInstanceReportFrameById(this.props.id);
    if (!chronicleFrame.isValid()) {
      const currentTimeFrame = this.props.reportTimeFrame;
      this.props.requestHistory(this.props.id, currentTimeFrame.dateFrom, currentTimeFrame.dateTo);
    }
  }

  render() {
    const chronicleFrame = this.props.getInstanceReportFrameById(this.props.id);
    const className = classnames(stylesTop.listItemInn, {
      [styles.listItemNoChronicle]: (!chronicleFrame.isValid() && !this.props.isExpanded),
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        {this.props.vehicle.original.name}
        { chronicleFrame.isLoading() ?
          <LinearProgress mode="indeterminate" />
          : false
        }
        { chronicleFrame.isEmpty() ?
          <div >
            { this.props.translations.no_history_data }
          </div>
          : (
            chronicleFrame.hasData() ?
              <div >
                { `reported ${chronicleFrame.getValidTrips().length} trips` }
              </div> : false
            )
        }
      </div>
    );
  }
}

ChronicleListItem.propTypes = {
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  vehicle: vehicleShape.isRequired,

  reportTimeFrame: PropTypes.object.isRequired,
  getInstanceReportFrameById: PropTypes.func.isRequired,
  selectVehicle: PropTypes.func.isRequired,
  requestHistory: PropTypes.func.isRequired,

  translations: historyDetailsShape.isRequired,
};

ChronicleListItem.defaultProps = {
  isExpanded: false,
};

const mapState = state => ({
  getInstanceReportFrameById: getInstanceExecReportFrameById(state),
  reportTimeFrame: getExecTimeFrame(state),
});
const mapDispatch = {
  selectVehicle: contextActions.ctxSelectVehicle,
  requestHistory: requestSoloReport,
};

export default connect(mapState, mapDispatch)(pure(ChronicleListItem));
