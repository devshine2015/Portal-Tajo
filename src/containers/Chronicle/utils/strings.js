import { makeStaticLableSVG, deviceAccessTime, imageTimer,
  notificationTimeToLeave, imageTimelapse, placesAcUnit } from './staticIcons';

//
// need this for setting content of mapBox popUp
export function generateInnerHTMLForHistoryMoment(momentData, phrases = {}) {
  let content = `${dateToChronicleLable(momentData.date)}<br>
                 ${speedToChronicleLable(momentData.speed)}`;

  if (momentData.temperature !== null) {
    content += `<br> ${temperatureToChronicleLable(momentData.temperature)}`;
  }
  content += `<hr>${phrases.lat || 'lat'}:<span style="float:right">${momentData.pos.lat.toFixed(6)}</span>
              <br>
              ${phrases.lng || 'lng'}:<span style="float:right">${momentData.pos.lng.toFixed(6)}</span>`;

  return content;
}

export function dateToChronicleLable(inDate) {
  return `${makeStaticLableSVG(deviceAccessTime)}<span style="float:right">${dateToChronicleString(inDate)}</span>`;
}

export function msToDurtationLable(duration) {
  return `${makeStaticLableSVG(imageTimelapse)}<span style="float:right">${msToTimeIntervalString(duration)}</span>`;
}


export function speedToChronicleLable(speed) {
  return `${makeStaticLableSVG(notificationTimeToLeave)}<span style="float:right">${speed.toFixed(1)} km/h</span>`;
}
export function temperatureToChronicleLable(temp) {
  return `${makeStaticLableSVG(placesAcUnit)}<span style="float:right">${temp.toFixed(1)} &deg;C</span>`;
}

function dateToChronicleString(inDate) {
  const timeStr = (inDate.getHours() < 10 ? 0 : '')
                + inDate.getHours()
                + ':'
                + (inDate.getMinutes() < 10 ? 0 : '')
                + inDate.getMinutes()
                + ':'
                + (inDate.getSeconds() < 10 ? 0 : '')
                + inDate.getSeconds();

  return timeStr;
}

export function msToTimeIntervalString(duration) {
  // const milliseconds = parseInt((duration % 1000) / 100, 10);
  // const seconds = parseInt((duration / 1000) % 60, 10);
  const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  const hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

  if (hours < 1) {
    return `${minutes}min`; // + ":" + seconds + "." + milliseconds;
  }
//    hours = (hours < 10) ? "0" + hours : hours;
//    minutes = (minutes < 10) ? "0" + minutes : minutes;
//    seconds = (seconds < 10) ? "0" + seconds : seconds;
  return `${hours}h ${minutes}min`;
}
