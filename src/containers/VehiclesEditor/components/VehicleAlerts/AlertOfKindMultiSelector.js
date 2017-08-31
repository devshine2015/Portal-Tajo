import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import { VelocityTransitionGroup } from 'velocity-react';
import { Chip, Card, CardHeader, CardText } from 'material-ui';
import {
  translate,
  makePhrasesShape,
} from 'utils/i18n';
import MainActionButton from 'components/Controls/MainActionButton';
import { getAlertConditionByIdFunc } from 'services/AlertsSystem/reducer';
import AlertsList from './AlertsList';
import styles from './styles.css';
import phrases from './PropTypes';

const stylesChip = {
  margin: 4,
  height: 32,
};

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
    const { translations } = this.props;
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
    const cardTitleAlertsAmount = myGFAlerts.length === 0 ? translations.no_alerts : `${myGFAlerts.length} ${translations.alerts}`;

    return (
      <Card
        className={styles.wrapper}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={`${this.props.title}: ${cardTitleAlertsAmount}`}
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
                label={translations.add}
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
  title: PropTypes.string.isRequired,
  alertFilter: PropTypes.func.isRequired,
  vehicleId: PropTypes.string.isRequired,
  vehicleAlerts: PropTypes.arrayOf(PropTypes.string).isRequired,
  alertById: PropTypes.func.isRequired,
  translations: makePhrasesShape(phrases).isRequired,
  doAddAlert: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

const mapState = state => ({
  alertById: getAlertConditionByIdFunc(state),
});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(pure(translate(phrases)(AlertOfKindMultiSelector)));

