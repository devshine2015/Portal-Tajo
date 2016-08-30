import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ItemProperty from '../DetailItemProperty';
import { deleteGF } from 'services/FleetModel/actions/gfActions';
import { showSnackbar } from 'containers/Snackbar/actions';
import DeletIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/maps/edit-location';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import { red900, red500, teal100, teal200, yellow700, yellow500 } from 'material-ui/styles/colors';
import stylesBase from '../styles.css';
import styles from './styles.css';

class LocationWithDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }
  onDelete = () => {
//    e.preventDefault();
    this.props.deleteGF(this.props.id, 1)
      .then(() => {
        this.props.showSnackbar('Succesfully removed ✓', 3000);
      }, () => {
        this.props.showSnackbar('Remove failed. Try later. ✓', 5000);
      });
  }
  onEdit = () => {

  }
  renderDetails() {
    if (this.props.isExpanded) {
      return [
        <Divider key="line01" />,
        <ItemProperty
          key="address"
          title="Address"
          value={this.props.address}
        />,
        <ItemProperty
          key="radius"
          title="Radius"
          value={this.props.radius.toFixed(0)}
        />,
        <Divider key="line02" />,
        <IconButton
          tooltip="Edit"
          onClick={this.onEdit}
          key="editBnt"
        >
           <EditIcon color={teal200} hoverColor={teal100} />
         </IconButton>,
        <IconButton
          tooltip="Delete"
          onClick={this.onDelete}
          className={styles.iconDelBtn}
          key="delBtn"
        >
           <DeletIcon color={yellow700} hoverColor={yellow500} />
         </IconButton>,
      ];
    }
    return false;
  }


  render() {
    const className = classnames(stylesBase.listItemInn, {
      [styles.listItemInn_expanded]: this.props.isExpanded,
    });

    return (
      <div
        className={className}
      >
        <h1 key="name">
          {this.props.name}
        </h1>
        { this.renderDetails() }
      </div>
    );
  }
}

LocationWithDetails.propTypes = {
  id: React.PropTypes.string.isRequired,
  isExpanded: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  pos: React.PropTypes.array.isRequired,
  radius: React.PropTypes.number.isRequired,
  address: React.PropTypes.string.isRequired,
  deleteGF: React.PropTypes.func.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
};
const mapState = () => ({});
const mapDispatch = {
  deleteGF,
  showSnackbar,
};
const PureListItemGF = pure(LocationWithDetails);
export default connect(mapState, mapDispatch)(PureListItemGF);
