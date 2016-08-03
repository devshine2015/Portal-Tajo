import React from 'react';
import ListBox from 'containers/PowerList/components/ListBox/';

export const LIST_VEHICLES = 'list.type.vehicels';
export const LIST_LOCATIONS = 'list.type.locations';

export const nameForType = (listType) => {
  switch (listType) {
    case LIST_VEHICLES:
      return 'vehicles';
    case LIST_LOCATIONS:
      return 'locations';
    default:
      return 'generic';
  }
};
// export const dataForType = (listType) => {
//   switch (listType) {
//     case LIST_VEHICLES:
//       return { title: 'Vehicles', element:
//                 <ListBox title="CAR" items={this.props.vehicles}
//                   hooks={execHooksForMe(this)}
//                   setUpHooks={setUpHooksForMe(this)}
//                 /> };
//     default:
//         return {};
//   }
//
// }
