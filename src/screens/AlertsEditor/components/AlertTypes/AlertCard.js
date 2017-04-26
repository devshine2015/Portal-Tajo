import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';

import tinycolor from 'tinycolor2';
import { VelocityTransitionGroup } from 'velocity-react';
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
      expanded: false,
      showForm: false,
      formMode: 'create',
    };
  }

  onEdit = () => {
    this.showForm();
  }

  handleExpandChange = expanded => {
    this.setState({ expanded });
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
      <Card className={css(classes.alertItem)}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title={this.props.alert.name}
          actAsExpander
          showExpandableButton
        />
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown', duration: 300 }}
          leave={{ animation: 'slideUp', duration: 300 }}
        >
          { this.state.expanded && (<CardText expandable style={{ padding: 0 }}>
                <VelocityTransitionGroup
                  enter={{ animation: 'slideDown', duration: 300 }}
                  leave={{ animation: 'slideUp', duration: 300 }}
                >
                  { this.state.showForm &&
                    (this.props.renderForm({
                      isOpened: this.state.showForm,
                      closeForm: this.closeForm,
                      alert: this.props.alert,
                    })
                  ) }
                </VelocityTransitionGroup>
                <VelocityTransitionGroup
                  enter={{ animation: 'slideDown', duration: 300 }}
                  leave={{ animation: 'slideUp', duration: 300 }}
                >
                  { !this.state.showForm &&
                    (<div className={css(classes.sectionBtnsWrapper)}>
                      <IconButton
                        tooltip={ "edit" }
                        onClick={this.onEdit}
                        key="editBtn"
                      >
                        <EditIcon color={this.context.muiTheme.palette.primary1Color}
                          hoverColor={tinycolor(this.context.muiTheme.palette.primary1Color).brighten()}
                        />
                      </IconButton>
                      <IconButton
                        tooltip={ "delete" }
                        onClick={this.onEdit}
                        key="delBtn"
                      >
                        <DeletIcon color={this.context.muiTheme.palette.primary1Color}
                          hoverColor={this.context.muiTheme.palette.primary3Color}
                        />
                      </IconButton>
                    </div>
                )}
              </VelocityTransitionGroup>
            </CardText>)
          }
        </VelocityTransitionGroup>
      </Card>
    );
  }
}

AlertCard.propTypes = {
  alert: React.PropTypes.object.isRequired,
  renderForm: React.PropTypes.func.isRequired,
};
AlertCard.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
// const mapState = (state) => ({
//   // alerts: getAlertConditions(state),
//   // alertById: getAlertConditionByIdFunc(state),
// });

// export default connect(mapState, mapDispatch)(pure(SpeedAlert));

export default pure(AlertCard);
