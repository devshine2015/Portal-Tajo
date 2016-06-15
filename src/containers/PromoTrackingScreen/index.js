import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { subscribeToData } from './actions';

class PromoTrackingScreen extends React.Component {

  componentWillMount() {
    this.props.subscribeToData();
  }

  renderRows() {
    return Object.entries(this.props.data).map((d, index) => {
      const id = d[0];
      const data = d[1];

      return (
        <TableRow key={id}>
          <TableRowColumn>
            {index}
          </TableRowColumn>
          <TableRowColumn>
            {data.name}
          </TableRowColumn>
          <TableRowColumn>
            {data.email}
          </TableRowColumn>
          <TableRowColumn>
            {data.phone}
          </TableRowColumn>
          <TableRowColumn>
            {data.type}
          </TableRowColumn>
          <TableRowColumn>
            {data.date || 'n/a'}
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    if (this.props.data.size === 0) return null;

    return (
      <div>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>
                Number
              </TableHeaderColumn>
              <TableHeaderColumn>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn>
                Email
              </TableHeaderColumn>
              <TableHeaderColumn>
                Phone
              </TableHeaderColumn>
              <TableHeaderColumn>
                Interested in
              </TableHeaderColumn>
              <TableHeaderColumn>
                Date
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {this.renderRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

PromoTrackingScreen.propTypes = {
  subscribeToData: React.PropTypes.func.isRequired,
  data: React.PropTypes.object.isRequired,
};

const PurePromoTrackingScreen = pure(PromoTrackingScreen);

const mapState = (state) => ({
  data: state.getIn(['promos', 'data']),
});
const mapDispatch = {
  subscribeToData,
};

export default connect(mapState, mapDispatch)(PurePromoTrackingScreen);
