import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { VelocityTransitionGroup } from 'velocity-react';
import ItemProperty from '../DetailItemProperty';
import { getGFByIdFunc } from 'services/FleetModel/reducer';
import { deleteGF } from 'services/FleetModel/actions/gfActions';
import { gfEditUpdate } from 'containers/GFEditor/actions';
import { contextActions } from 'services/Global/actions';
import { mapStoreSetPan } from 'containers/Map/reducerAction';

import { showSnackbar } from 'containers/Snackbar/actions';
import DeletIcon from 'material-ui/svg-icons/action/delete-forever';
// import EditIcon from 'material-ui/svg-icons/maps/edit-location';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

import {
  yellow700,
  yellow500,
} from 'material-ui/styles/colors';

import stylesBase from '../styles.css';
import styles from './styles.css';
import { gfDetailsShape } from '../PropTypes';

// const stylesCheck = {
//   labelStyle: {
//     color: 'white',
//   },
//   iconStyle: {
//     fill: 'white',
//   },
// };

class LocationWithDetails extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.gf.filteredOut !== nextProps.gf.filteredOut
      || (this.props.isExpanded !== nextProps.isExpanded);
  }

  onClick = () => {
    this.props.selectGF(this.props.gf.id);
    this.props.mapStoreSetPan([this.props.gf.pos]);
  }
  onDelete = () => {
//    e.preventDefault();
    this.props.deleteGF(this.props.gf.id, 1)
      .then(() => {
        this.props.showSnackbar(`${this.props.translations.remove_success} ✓`, 3000);
      }, () => {
        this.props.showSnackbar(`${this.props.translations.remove_fail} ✘`, 5000);
      });
  }
  onEdit = () => {
    this.props.gfEditUpdate(this.props.gfById(this.props.gf.id));
  }
  renderDetails() {
    // TODO: no API for GF editing yet - remove the btn
    // <IconButton
    //   tooltip="Edit"
    //   onClick={this.onEdit}
    //   key="editBnt"
    // >
    //    <EditIcon color={teal200} hoverColor={teal100} />
    //  </IconButton>

    if (this.props.isExpanded) {
      return (<div>
        <Divider key="line01" />
        <ItemProperty
          key="address"
          title={ this.props.translations.address }
          value={this.props.gf.address}
        />
        {this.props.gf.isPolygon ? null :
        <ItemProperty
          key="radius"
          title={ this.props.translations.radius }
          value={this.props.gf.radius.toFixed(0)}
        />
        }
        <Divider key="line02" />
        <IconButton
          tooltip={ this.props.translations.delete }
          onClick={this.onDelete}
          className={styles.iconDelBtn}
          key="delBtn"
        >
          <DeletIcon color={yellow700} hoverColor={yellow500} />
        </IconButton>
      </div>);
    }
    return false;
  }

        // <Checkbox
        //   labelStyle={stylesCheck.labelStyle}
        //   iconStyle={stylesCheck.iconStyle}
        //   label="Alert on enter"
        //   name="alertEnter"
        //   onCheck={this.onChange}
        // />
        // <Checkbox
        //   labelStyle={stylesCheck.labelStyle}
        //   iconStyle={stylesCheck.iconStyle}
        //   label="Alert on exit"
        //   name="alertExit"
        //   onCheck={this.onChange}
        // />


  render() {
    const className = classnames(stylesBase.listItemInn, {
      [styles.listItemInn_expanded]: this.props.isExpanded,
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        <h1 key="name">
          {this.props.gf.name}
        </h1>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 500 }}
          leave={{ animation: 'slideUp', duration: 350 }}
        >
          { this.renderDetails() }
        </VelocityTransitionGroup>
      </div>
    );
  }
}

LocationWithDetails.propTypes = {
  selectGF: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool,
  gf: PropTypes.object.isRequired,

  deleteGF: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  gfEditUpdate: PropTypes.func.isRequired,
  gfById: PropTypes.func.isRequired,
  mapStoreSetPan: PropTypes.func.isRequired,

  translations: gfDetailsShape.isRequired,
};

LocationWithDetails.defaultProps = {
  isExpanded: false,
};

const mapState = (state) => ({
  gfById: getGFByIdFunc(state),
});
const mapDispatch = {
  selectGF: contextActions.ctxSelectGF,

  deleteGF,
  showSnackbar,
  gfEditUpdate,
  mapStoreSetPan,
};

export default connect(mapState, mapDispatch)(LocationWithDetails);
