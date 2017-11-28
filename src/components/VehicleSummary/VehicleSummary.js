import React from 'react';

// import PortalReports from 'containers/Report';

// export default PortalReports;
import PropTypes from 'prop-types';

import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import Layout from 'components/Layout';

import { css } from 'aphrodite/no-important';
import classes from './classes';

const HeaderItem = ({
  title,
  value,
}) => (
  <div className={css(classes.itemBody)}>
    <span className={css(classes.itemTitle)}>{`${title}:`}</span>
    <span className={css(classes.itemValue)}>{value}</span>
  </div>
);

HeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

class VehicleSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  render() {
    if (this.props.theVehicle === null) {
      return false;
    }
    const headLbl = this.props.theVehicle.original.name;
    return (
      <Layout.Section style={{ padding: '32px' }}>
        <div className={css(classes.title)}>
          {headLbl}
        </div>
        <div className={css(classes.itemsContainer)}>
          <HeaderItem title={'make'} value={this.props.theVehicle.original.make} />
          <HeaderItem title={'model'} value={this.props.theVehicle.original.model} />
          <HeaderItem title={'year'} value={this.props.theVehicle.original.year} />
          <HeaderItem title={'licence plate'} value={this.props.theVehicle.original.licensePlate} />
          <HeaderItem title={'IME'} value={this.props.theVehicle.original.deviceId} />
          <HeaderItem title={'chassis number'} value={this.props.theVehicle.original.chassisNumber} />
        </div>
        {/* <Layout.Header
          label={headLbl}
          style={{ textAlign: 'center', paddingLeft: 0 }}
        /> */}

      </Layout.Section>);
  }
}

VehicleSummary.propTypes = {
  theVehicle: PropTypes.object,
};

// const mapState = state => ({
// });
// const mapDispatch = {
// };

// export default connect(mapState, mapDispatch)(pure(VehicleMaintenance));
export default pure(VehicleSummary);
