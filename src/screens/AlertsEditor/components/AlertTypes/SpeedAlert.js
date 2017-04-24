import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import classes from './classes';

class SpeedAlert extends React.Component {
  render() {
    return (
      <Card className={css(classes.alertItem)}>
        <CardHeader
          title={this.props.alert.name}
          subtitle="speed < 50 kmh"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

SpeedAlert.propTypes = {
  alert: React.PropTypes.object.isRequired,
};

// const mapState = (state) => ({
//   // alerts: getAlertConditions(state),
//   // alertById: getAlertConditionByIdFunc(state),
// });

// export default connect(mapState, mapDispatch)(pure(SpeedAlert));

export default pure(SpeedAlert);
