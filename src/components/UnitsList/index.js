import React from 'react';
import pure from 'recompose/pure';
// import { connect } from 'react-redux';
// import ListItem from './components/ListItem';
import styles from './styles.css';
// import { getFleetData } from 'services/FleetModel/reducer';

class UnitsList extends React.Component {
  render() {
    return (
        <div className={styles.listBox}>
          <div> one </div>
          <div> two </div>
          <div> three </div>
        </div>
      );
  }
  // render() {
  //   const d = Object.values(this.props.backendData);
  //
  //   if (d.length !== 0) {
  //     return (
  //       <div className={styles.listBox}>
  //         {
  //           d.map(data => (
  //             <div key={data.name}>{data.name}</div>
  //           ))
  //         }
  //       </div>
  //     );
  //   }
  //
  //   return null;
  // }
}

const PureUnitsList = pure(UnitsList);

// const mapState = (state) => ({
//   backendData: getFleetData(state).toJS(),
// });

// export default connect(mapState)(PureUnitsList);
export default PureUnitsList;
