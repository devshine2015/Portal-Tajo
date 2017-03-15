import React from 'react';
import Chip from 'material-ui/Chip';
import SvgIconDone from 'material-ui/svg-icons/action/done';
import theme from 'configs/theme';

// import styles from './styles.css';

const chipProps = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

const Active = ({ name, onClick }) => (
  <Chip
    onTouchTap={onClick}
    backgroundColor={theme.palette.PLItemBackgroundColor}
    labelColor="#fff"
  >
    { name }

    <SvgIconDone color="white" style={{ marginLeft: 5 }} />
  </Chip>
);

Active.propTypes = chipProps;

const Available = ({ name, onClick }) => (
  <Chip
    onTouchTap={onClick}
    labelColor="#777"
  >
    { name }
  </Chip>
);

Available.propTypes = chipProps;

class PermissionChip extends React.Component {

  onClick = () => {
    console.log(`clicked ${this.props.id}`);
  }

  render() {
    const { isActive, ...rest } = this.props;

    return (
      isActive ?
        <Active {...rest} onClick={this.onClick} /> :
        <Available {...rest} onClick={this.onClick} />
    );
  }
}

PermissionChip.propTypes = {
  isActive: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
};

export default PermissionChip;
