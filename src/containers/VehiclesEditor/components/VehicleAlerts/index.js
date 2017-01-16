import React from 'react';
import pure from 'recompose/pure';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import IconSnow from 'material-ui/svg-icons/places/ac-unit';
import IconEnter from 'material-ui/svg-icons/action/exit-to-app';
import IconTrLight from 'material-ui/svg-icons/maps/traffic';
import IconRun from 'material-ui/svg-icons/maps/directions-run';
import IconProblem from 'material-ui/svg-icons/action/report-problem';
import IconLocation from 'material-ui/svg-icons/maps/pin-drop';
import IconLocationOff from 'material-ui/svg-icons/maps/place';
import styles from './styles.css';

const stylesChip = {
  margin: 4,
};
const stylesAddBtn = {
  float: 'right',
};

function handleRequestDelete() {
//  alert('You clicked the delete button.');
}

function handleTouchTap() {
//  alert('You clicked the Chip.');
}

class VehicleAlerts extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.id !== nextProps.id) {
  //     this.setNewVehicleDetails(nextProps);
  //   }
  // }

  render() {
    return (
      <Paper zDepth={2} className={styles.wrapper}>
      <span >ALERTS</span>
      <FloatingActionButton style={stylesAddBtn}>
        <ContentAdd />
      </FloatingActionButton>
      <div className={styles.chipsWrapper}>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconSnow />} />
            Temp -15&#8451;..-8&#8451;
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconSnow />} />
            Temp -3&#8451;..+5&#8451;
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconEnter />} />
            Enter Depot
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconTrLight />} />
            Traffic Jam
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconRun />} />
            Overspeeding
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconProblem />} />
            Vehicle Touble Code
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconLocation />} />
            Entered Hiedan Junction
          </Chip>
          <Chip
            onRequestDelete={handleRequestDelete}
            onTouchTap={handleTouchTap}
            style={stylesChip}
          >
            <Avatar color="#156671" icon={<IconLocationOff />} />
            Left Hiedan Junction
          </Chip>
        </div>
      </Paper>
    );
  }
}

// VehicleAlerts.propTypes = {
// };

export default pure(VehicleAlerts);
