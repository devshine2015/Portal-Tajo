import React from 'react';
import pure from 'recompose/pure';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getInstanceChronicleFrameById } from 'containers/Chronicle/reducer';

// import Divider from 'material-ui/Divider';

import stylesTop from '../styles.css';
import styles from './styles.css';

import LinearProgress from 'material-ui/LinearProgress';

class ChronicleListItem extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //
  // }
  onClick = () => {
    this.props.onClick(this.props.id);
  }
  getChronocle = () => {

  }
  // <Divider key="line02" />
  render() {
    const chronicleFrame = this.props.getInstanceChronicleFrameById(this.props.id);
    const className = classnames(stylesTop.listItemInn, {
      [styles.listItemNoChronicle]: !chronicleFrame.isValid(),
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        {this.props.name}
        { chronicleFrame.isLoading() ?
          <LinearProgress mode="indeterminate" />
          : false
        }
        { chronicleFrame.isEmpty() ?
          <div >
              No data...
            </div>
          : false
        }
      </div>
    );
  }
}

ChronicleListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  getInstanceChronicleFrameById: React.PropTypes.func.isRequired,
};

const mapState = (state) => ({
  getInstanceChronicleFrameById: getInstanceChronicleFrameById(state),
});
const PureChronicleListItem = pure(ChronicleListItem);
export default connect(mapState)(PureChronicleListItem);
