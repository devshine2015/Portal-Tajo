import React from 'react';
import pure from 'recompose/pure';
import { CHRONICLE_LOCAL_INCTANCE_STATE_NONE,
  CHRONICLE_LOCAL_INCTANCE_STATE_LOADING } from 'containers/Chronicle/actions';
// import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
// import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

// import { red900, red500, teal100, teal200, yellow700, yellow500 } from 'material-ui/styles/colors';


import styles from '../styles.css';

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
  render() {
    return (
      <div
        className={styles.listItemInn}
        onClick={this.onClick}
        style={this.props.chronicleState === CHRONICLE_LOCAL_INCTANCE_STATE_NONE ?
           { backgroundColor: 'gray' } : { } }
      >
        {this.props.name}
        <Divider key="line02" />
        { this.props.chronicleState === CHRONICLE_LOCAL_INCTANCE_STATE_LOADING ?
          <LinearProgress mode="indeterminate" />
          : false
        }
        { (this.props.chronicleFrame !== null
          && !this.props.chronicleFrame.isValid())
          ? <span >
              No data...
            </span>
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
