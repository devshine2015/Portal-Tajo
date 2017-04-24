import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import classes from './classes';

class TempAlert extends React.Component {
  render() {
    return (
      <Card className={css(classes.alertItem)}>
        <CardHeader
          title={this.props.alert.name}
          subtitle="Temperature < -12 C"
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

TempAlert.propTypes = {
  alert: React.PropTypes.object.isRequired,
};

// const mapState = (state) => ({
//   // alerts: getAlertConditions(state),
//   // alertById: getAlertConditionByIdFunc(state),
// });

// export default connect(mapState, mapDispatch)(pure(SpeedAlert));

export default pure(TempAlert);
