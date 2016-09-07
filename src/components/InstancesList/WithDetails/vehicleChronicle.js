import React from 'react';
import pure from 'recompose/pure';
import classnames from 'classnames';
import { CHRONICLE_LOCAL_INCTANCE_STATE_NONE,
  CHRONICLE_LOCAL_INCTANCE_STATE_LOADING } from 'containers/Chronicle/actions';
// import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
// import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

// import { red900, red500, teal100, teal200, yellow700, yellow500 } from 'material-ui/styles/colors';


import stylesTop from '../styles.css';
import styles from './styles.css';

import LinearProgress from 'material-ui/LinearProgress';
// import RefreshIndicator from 'material-ui/RefreshIndicator';
// const style = {
//   container: {
//   position: 'relative',
// },
// refresh: {
//   display: 'inline-block',
//   position: 'relative',
// },
// };

class ChronicleListItem extends React.Component {

  onClick = () => {
    this.props.onClick(this.props.id);
  }

  getChronocle = () => {

  }
  // <Divider key="line02" />
  render() {
    const className = classnames(stylesTop.listItemInn, {
      [styles.listItemNoChronicle]: this.props.chronicleState === CHRONICLE_LOCAL_INCTANCE_STATE_NONE,
    });

    return (
      <div
        className={className}
        onClick={this.onClick}
      >
        {this.props.name}
        { this.props.chronicleState === CHRONICLE_LOCAL_INCTANCE_STATE_LOADING ?
          <LinearProgress mode="indeterminate" />
          : false
        }
        { (this.props.chronicleState !== CHRONICLE_LOCAL_INCTANCE_STATE_NONE
          && this.props.chronicleState !== CHRONICLE_LOCAL_INCTANCE_STATE_LOADING
          && this.props.chronicleFrame !== null
          && !this.props.chronicleFrame.isValid())
          ? <div >
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
  chronicleState: React.PropTypes.string,
  chronicleFrame: React.PropTypes.object,
};

export default pure(ChronicleListItem);
