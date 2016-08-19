import React from 'react';
import { connect } from 'react-redux';
import pure from 'recompose/pure';
import ItemProperty from './../ItemProperty';
import { deleteGF } from 'services/FleetModel/actions/locationsActions';
import { showSnackbar } from 'containers/Snackbar/actions';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import DeletIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/maps/edit-location';
import IconButton from 'material-ui/IconButton';

import { red900, teal900 } from 'material-ui/styles/colors';


import stylesBasic from './../styles.css';
import styles from './styles.css';


class ListItemGF extends React.Component {
  onClick = () => {
    this.props.onClick(this.props.locationObj.id);
  }

  onDelete = () => {
//    e.preventDefault();
    this.props.deleteGF(this.props.locationObj.id, 1)
      .then(() => {
        this.props.showSnackbar('Succesfully removed ✓', 3000);
      }, () => {
        this.props.showSnackbar('Remove failed. Try later. ✓', 5000);
      });
  }
  render() {
    // collapsed view
    if (!this.props.isSelected) {
      return (
        <div
          className={stylesBasic.listItem}
          onClick={this.onClick}
        >
          <div > {this.props.locationObj.name} </div>
        </div>
      );
    }
    // selected/exapnded view
    return (
      <div
        className={stylesBasic.listItemSelected}
        onClick={this.onClick}
      >
        <div > {this.props.locationObj.name} </div>
        <hr />
        <ItemProperty title="Address" value={`${this.props.locationObj.address}`} />
        <ItemProperty title="Radius" value={`${this.props.locationObj.radius.toFixed(0)} m`} />
        <hr />
        <IconButton tooltip="Edit" onClick={this.onDelete}>
          <EditIcon color={teal900} />
        </IconButton>
        <IconButton tooltip="Delete" onClick={this.onDelete}>
          <DeletIcon color={red900} />
        </IconButton>
      </div>
    );
  }
}

ListItemGF.propTypes = {
  locationObj: React.PropTypes.object,
  onClick: React.PropTypes.func.isRequired,
  isSelected: React.PropTypes.bool.isRequired,
  deleteGF: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};
const mapState = () => ({});
const mapDispatch = {
  deleteGF,
  showSnackbar,
};
const PureListItemGF = pure(ListItemGF);
export default connect(mapState, mapDispatch)(PureListItemGF);
