import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Chip from 'material-ui/Chip';
import SvgIconDone from 'material-ui/svg-icons/action/done';
import { VelocityComponent } from 'velocity-react';
import theme from 'configs/theme';

import classes from './classes';

const STYLES = {
  done: {
    height: 15,
    width: 15,
    marginLeft: 5,
    marginBottom: 3,
  },
  label: {
    transition: 'color .3s',
    padding: 0,
  },
};

const initialState = {
  chipWidth: '100%',
  initialRender: true,
};

class PermissionChip extends React.Component {

  constructor(props) {
    super(props);

    this.duration = 300;

    this.state = initialState;
  }

  componentWillUnmount() {
    this.setState(initialState);
  }

  onClick = () => {
    this.props.onClick(this.props.id, this.props.isActive);
  }

  saveNodeParams = ref => {
    if (!ref) return;

    const { isActive } = this.props;
    const nodeParams = ref.getBoundingClientRect();

    this.setState({
      chipWidth: isActive ? nodeParams.width - 18 : nodeParams.width,
      initialRender: false,
    });
  }

  render() {
    // console.log(this.props.id);
    const { isActive } = this.props;
    const { chipWidth, initialRender } = this.state;
    const animation = `transition.expand${(isActive ? 'In' : 'Out')}`;
    const labelColor = isActive ? '#fff' : '#777';
    let width = chipWidth;
    let showVelocity = isActive;

    if (isActive) {
      width = chipWidth + 18;
      // if permission is active we need calculate width with
      // icon width included during initial rendering.
      // To calculate width correctly the component must have
      // default width = 100%,
      if (initialRender) {
        showVelocity = true;
        width = chipWidth;
      }
    }

    return (
      <VelocityComponent
        animation={{ width }}
        duration={300}
      >
        <Chip
          className={classes.chip}
          onClick={this.onClick}
          backgroundColor={isActive ? theme.palette.PLItemBackgroundColor : ''}
          labelColor={labelColor}
          labelStyle={STYLES.label}
        >
          <div
            className={classes.chipInside}
            ref={this.saveNodeParams}
          >
            { this.props.name }

            { showVelocity && (
              <VelocityComponent
                key="lol"
                animation={animation}
                duration={300}
              >
                <SvgIconDone color="white" style={STYLES.done} />
              </VelocityComponent>
            )}
          </div>
        </Chip>
      </VelocityComponent>
    );
  }
}

PermissionChip.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default pure(PermissionChip);
