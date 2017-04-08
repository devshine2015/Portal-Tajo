const googleMapsAPI = require('google-maps-api')('AIzaSyBFr7EuGfq5CownOn7p2-fUlzn-iJDBAAU',
  // 'AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      ['distancematrix']);

// the service limited by 25 pos
const maxRequestOriginsNumber = 25;

const distanceMatrixToSingleDst = (fromArrayPos, toPos, haveDistCallback, noHaveDistCallback) => {
  googleMapsAPI().then(maps => {
    const distanceMatrixService = new maps.DistanceMatrixService();
    const origins = fromArrayPos.slice(0, maxRequestOriginsNumber)
      .map(aFrom => ({ lat: aFrom[0], lng: aFrom[1] }));
    // const destinations = toArrayPos.slice(0, maxRequestOriginsNumber)
    //   .map(aTo => ({ lat: aTo[0], lng: aTo[1] }));
    const destinations = [{ lat: toPos[0], lng: toPos[1] }];
    distanceMatrixService.getDistanceMatrix(
      {
        origins,
        destinations,
        travelMode: 'DRIVING',
        drivingOptions: {
          departureTime: new Date(/* now, or future date */),
          trafficModel: 'pessimistic',
        },
        unitSystem: maps.UnitSystem.METRIC,
      },
        (distResult, distStatus) => {
          if (distStatus !== 'OK') {
            noHaveDistCallback();
            return;
          }
          const resultRows = distResult.rows.map(aRow => (
              aRow.elements[0].status === 'OK' ?
              {
                distanceM: aRow.elements[0].distance.value,
                durationMS: aRow.elements[0].duration.value * 1000,
              } :
              {
                distanceM: Number.MAX_VALUE,
                durationMS: Number.MAX_VALUE,
              }
          ));
          haveDistCallback(resultRows);
        }
      );
  });
};

// const distanceMatrix = (fromArrayPos, toArrayPos, haveDistCallback, noHaveDistCallback) => {
//   googleMapsAPI().then(maps => {
//     const distanceMatrixService = new maps.DistanceMatrixService();
//     const origins = fromArrayPos.slice(0, maxRequestOriginsNumber)
//       .map(aFrom => ({ lat: aFrom[0], lng: aFrom[1] }));
//     const destinations = toArrayPos.slice(0, maxRequestOriginsNumber)
//       .map(aTo => ({ lat: aTo[0], lng: aTo[1] }));
//     distanceMatrixService.getDistanceMatrix(
//       {
//         origins,
//         destinations,
//         travelMode: 'DRIVING',
//         drivingOptions: {
//           departureTime: new Date(/* now, or future date */),
//           trafficModel: 'pessimistic',
//         },
//         unitSystem: maps.UnitSystem.METRIC,
//       },
//         (distResult, distStatus) => {
//           if (distStatus !== 'OK') {
//             noHaveDistCallback();
//             return;
//           }

//           const resultRows = [];
//           distResult.rows.forEach(aRow => {
//             resultRows.push.apply(resultRows,
//                 aRow.elements.filter(aElmnt => aElmnt.status === 'OK')
//                 .map(aElmnt => ({
//                   distanceM: aElmnt.distance.value,
//                   durationMS: aElmnt.duration.value * 1000,
//                 })));
//           });

//           haveDistCallback(resultRows);
//         }
//       );
//   });
// };

export default distanceMatrixToSingleDst;
