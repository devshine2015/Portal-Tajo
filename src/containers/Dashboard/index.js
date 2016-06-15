import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import createBaseUrl from 'utils/createBaseUrl';

class Dashboard extends React.Component {

  render() {
    const baseUrl = `${createBaseUrl(this.props.fleet)}/dashboard`;

    return (
      <div>
        <div className="toppanel">Top Panel</div>
        <Link to={`${baseUrl}/reports`}>Reports</Link> <wbr />
        <Link to={`${baseUrl}/installer`}>Installer</Link> <wbr />
        <Link to={`${baseUrl}/promos`}>Promos</Link> <wbr />

        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
  fleet: React.PropTypes.string.isRequired,
};

const PureDashboard = pure(Dashboard);

const mapState = (state) => ({
  fleet: state.getIn(['global', 'fleet']),
});

export default connect(mapState)(PureDashboard);
