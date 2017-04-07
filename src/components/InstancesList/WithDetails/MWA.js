import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { VelocityTransitionGroup } from 'velocity-react';
import ItemProperty from '../DetailItemProperty';
import Divider from 'material-ui/Divider';

import stylesBase from '../styles.css';
import styles from './styles.css';
import { gfDetailsShape } from '../PropTypes';


class MWAJobWithDetails extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.mwaJobObject);
  }
  renderDetails() {
    // if (this.props.isExpanded) {
      return (<div>
        <Divider key="line01" />
        <ItemProperty
          key="carName"
          title={ this.props.translations.mwa_job_carname }
          value={this.props.mwaJobObject.vehicleName}
        />
      </div>);
    // }
    // return false;
  }

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
          {this.props.mwaJobObject.name}
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

MWAJobWithDetails.propTypes = {
  mwaJobObject: React.PropTypes.object.isRequired,
  isExpanded: React.PropTypes.bool,

  onClick: React.PropTypes.func.isRequired,
  translations: gfDetailsShape.isRequired,
};

const mapState = (state) => ({
  // gfById: getGFByIdFunc(state),
});
const mapDispatch = {
  // deleteGF,
  // showSnackbar,
  // gfEditUpdate,
};
const PureListMWAJob = pure(MWAJobWithDetails);
export default connect(mapState, mapDispatch)(PureListMWAJob);
