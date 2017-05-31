import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { Chip, Card, CardHeader, CardText } from 'material-ui';

import MainActionButton from 'components/Controls/MainActionButton';
// import Layout from 'components/Layout';

import AlertsList from './AlertsList';

import { getAlertConditionByIdFunc } from 'services/AlertsSystem/reducer';

import * as alertKinds from 'services/AlertsSystem/alertKinds';

import styles from './styles.css';

const stylesChip = {
  margin: 4,
  height: 32,
};

// const stylesAddBtn = {
//   float: 'right',
// };

class AlertOfKindMultiSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: false,
      expanded: false,
    };
  }

  onAddClick = () => {
    this.setState({ isAdding: !this.state.isAdding });
  }

  handleExpandChange = (expanded) => {
    this.setState({ expanded });
  }

  closeList = () => {
    this.setState({ isAdding: false });
  }
  render() {
    // const alertKindData = alertKinds.getAlertByKind(alertKinds._ALERT_KIND_GF);
    // <Avatar color="#156671" icon={alertKindData.icon} />
    const myGFAlerts = this.props.vehicleAlerts.map(alertId => (this.props.alertById(alertId)))
        .filter(alrt => alrt !== null && this.props.alertFilter(alrt))
        .map(alrt => (
          <Chip
            key={alrt.id}
            onRequestDelete={() => (this.props.onRemoveClick(alrt.id))}
            style={stylesChip}
          >
            {alrt.gfName !== '' ? alrt.gfName : alrt.name}
          </Chip>));
    return (
      <Card
        className={styles.wrapper}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={`${this.props.title}:
            ${myGFAlerts.length === 0 ? 'no' : myGFAlerts.length} alerts`}
          actAsExpander
          showExpandableButton
        />
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 200 }}
          leave={{ animation: 'slideUp', duration: 200 }}
        >
          { this.state.expanded && (<CardText expandable style={{ padding: 0, minHeight: 40 }}>
            <div
              style={{ float: 'right', margin: 4 }}
              ref={(node) => {
                this.rootNode = node;
              }}
            >
              <MainActionButton
                label={'ADD'}
                onClick={this.onAddClick}
              />
            </div>
            <AlertsList
              isOpen={this.state.isAdding}
              handleRequestClose={this.closeList}
              anchorEl={this.rootNode}
              vehicleId={this.props.vehicleId}
              vehicleAlerts={this.props.vehicleAlerts}
              doAddAlert={this.props.doAddAlert}
              alertFilter={this.props.alertFilter}
            />

            <div className={styles.chipsWrapper}>
              {/* <VelocityTransitionGroup
            component="div"
            style={{ display: 'flex', flexWrap: 'wrap' }}
            enter={{ animation: 'slideDown', duration: 200 }}
            leave={{ animation: 'slideUp', duration: 200 }}
          >*/}
              {myGFAlerts}
              {/* </VelocityTransitionGroup>*/}
            </div>
          </CardText>)}
        </VelocityTransitionGroup>
      </Card>
    );
  }
}

AlertOfKindMultiSelector.propTypes = {
  title: React.PropTypes.string.isRequired,
  alertFilter: React.PropTypes.func.isRequired,
  vehicleId: React.PropTypes.string.isRequired,
  vehicleAlerts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  alertById: React.PropTypes.func.isRequired,

  doAddAlert: React.PropTypes.func.isRequired,
  onRemoveClick: React.PropTypes.func.isRequired,
};

const mapState = state => ({
  alertById: getAlertConditionByIdFunc(state),
});
const mapDispatch = {
};

export default connect(mapState, mapDispatch)(pure(AlertOfKindMultiSelector));

