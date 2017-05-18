const googleMapsAPI = require('google-maps-api')('AIzaSyBFr7EuGfq5CownOn7p2-fUlzn-iJDBAAU',
  // 'AIzaSyA-97-nJq7i1hy46cjHJSeOwkKgBdv08aI',
      // ['geocode']);
);

export const reverseGeocode = (latLng, haveCallback, noHaveCallback) => {
  googleMapsAPI().then((maps) => {
    const geocoder = new maps.Geocoder();

  console.log(` ====>>> asking geocoder  ${performance.now()} milliseconds.`);
    geocoder.geocode({ location: latLng },
      (results, status) => {
        if (status === 'OK') {
          if (results[1]) {
            haveCallback(results[1].formatted_address);
          } else {
            noHaveCallback(status);
          }
        } else {
          noHaveCallback(status);
        }
      });
  });
};

const queue = [];
let timerId = 0;
const oneProcess = () => {
  reverseGeocode(queue[0].latLng, queue[0].haveCallback, queue[0].noHaveCallback);
  queue.shift();
  timerId = 0;
  if (queue.length > 0) {
    timerId = window.setTimeout(oneProcess, 2000);
  }
};

export const queueReverseGeocode = (latLng, haveCallback, noHaveCallback) => {
  queue.push({ latLng, haveCallback, noHaveCallback });
  if (timerId === 0) {
    timerId = window.setTimeout(oneProcess, 1000);
  }
};

