import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import { css } from 'aphrodite/no-important';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import DeletIcon from 'material-ui/svg-icons/action/delete-forever';
// import EditIcon from 'material-ui/svg-icons/maps/edit-location';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';

import classes from './classes';

class AlertCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      formMode: 'create',
    };
  }

  onEdit = () => {
    this.showForm();
  }

  showForm = () => {
    this.setState({
      showForm: true,
    });
  }

  closeForm = () => {
    this.setState({
      showForm: false,
    });
  }

  render() {
    return (
      <Card className={css(classes.alertItem)}>
        <CardHeader
          title={this.props.alert.name}
          actAsExpander
          showExpandableButton
        />
          <CardText expandable>
          { this.state.showForm ?
            (this.props.renderForm({
              isOpened: this.state.showForm,
              closeForm: this.closeForm,
              alert: this.props.alert,
            })
          ) : (
            <IconButton
              tooltip={ "edit" }
              onClick={this.onEdit}
              key="delBtn"
            >
              <EditIcon />
            </IconButton>
          )}
          </CardText>
         }
      </Card>
    );
  }
}

AlertCard.propTypes = {
  alert: React.PropTypes.object.isRequired,
  renderForm: React.PropTypes.func.isRequired,
};

// const mapState = (state) => ({
//   // alerts: getAlertConditions(state),
//   // alertById: getAlertConditionByIdFunc(state),
// });

// export default connect(mapState, mapDispatch)(pure(SpeedAlert));

export default pure(AlertCard);
