import { metersToKmString, msToTimeIntervalString } from 'utils/convertors';
import { makeStaticLableSVG, deviceAccessTime, localGasStation,
  notificationTimeToLeave, imageTimelapse, placesAcUnit } from './staticIcons';

//
// need this for setting content of mapBox popUp
export function generateInnerHTMLForHistoryMoment(momentData/* , phrases = {}*/) {
  let content = `${dateToChronicleLable(momentData.date)}<br>
                 ${speedToChronicleLable(momentData.speed)}`;

  if (momentData.temperature !== null) {
    content += `<br> ${temperatureToChronicleLable(momentData.temperature)}`;
  }
  if (momentData.fuel !== null) {
    content += `<br> ${fuelToChronicleLable(momentData.fuel)}`;
  }
  // content += `<hr>${phrases.lat || 'lat'}:<span style="float:right">${momentData.pos.lat.toFixed(6)}</span>
  //             <br>
  //             ${phrases.lng || 'lng'}:<span style="float:right">${momentData.pos.lng.toFixed(6)}</span>`;

  return content;
}

export function dateToChronicleLable(inDate) {
  return `${makeStaticLableSVG(deviceAccessTime)}<span style="float:right">${dateToChronicleString(inDate)}</span>`;
}

export function msToDurtationLable(duration) {
  return `${makeStaticLableSVG(imageTimelapse)}<span style="float:right">${msToTimeIntervalString(duration)}</span>`;
}

export function metersToDistanceLable(meters) {
  // Math.round((meters/1000) * 10) / 10
  // Math.round((meters/100) ) / 10
  // meters to km, rounding to 1 dec point
  return `${makeStaticLableSVG(notificationTimeToLeave)}<span style="float:right">${metersToKmString(meters)}</span>`;
}

export function speedToChronicleLable(speed) {
  return `${makeStaticLableSVG(notificationTimeToLeave)}<span style="float:right">${speed.toFixed(1)} km/h</span>`;
}

export function temperatureToChronicleLable(temp) {
  return `${makeStaticLableSVG(placesAcUnit)}<span style="float:right">${temp.toFixed(1)} &deg;C</span>`;
}

export function fuelToChronicleLable(fuelNormalized) {
  return `${makeStaticLableSVG(localGasStation)}<span style="float:right">${(fuelNormalized * 100).toFixed(0)}%</span>`;
}

function dateToChronicleString(inDate) {
  const timeStr = `${(inDate.getHours() < 10 ? 0 : '')
                + inDate.getHours()
                 }:${
                 inDate.getMinutes() < 10 ? 0 : ''
                 }${inDate.getMinutes()
                 }:${
                 inDate.getSeconds() < 10 ? 0 : ''
                 }${inDate.getSeconds()}`;

  return timeStr;
}

