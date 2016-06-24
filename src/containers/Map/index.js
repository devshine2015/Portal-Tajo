import React from 'react';
import pure from 'recompose/pure';
//import classnames from 'classnames';
import styles from './styles.css';


const dbgFooterStyle = {
  width: '100%',
  backgroundColor: 'orange',
  position: 'absolute',
  bottom: '0px',
};


class Map extends React.Component {
  render() {
    return (
      <div className = {styles.mapContainer}>
      THE map goes HERE
        <div style={dbgFooterStyle}>
        BOTTOM
        </div>
      </div>
    );
  }
}

const PureMap = pure(Map);

export default PureMap;
