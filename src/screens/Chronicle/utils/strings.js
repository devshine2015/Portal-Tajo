import moment from 'moment';
import { isNoIcons } from 'configs';
import { metersToKmString, msToTimeIntervalString, fuelToString } from 'utils/convertors';
import { makeStaticLableSVG, deviceAccessTime, localGasStation,
  notificationTimeToLeave, imageTimelapse, placesAcUnit } from './staticIcons';

//
// need this for setting content of mapBox popUp
export function generateInnerHTMLForHistoryMoment(momentData, theVehicle/* , phrases = {} */) {
  let content = `${dateToChronicleLable(momentData.date)}<br>
                 ${speedToChronicleLable(momentData.speed)}`;

  if (momentData.temperature !== null) {
    content += `<br> ${temperatureToChronicleLable(momentData.temperature)}`;
  }
  if (momentData.fuel !== null) {
    content += `<br> ${fuelToChronicleLable(momentData.fuel, theVehicle.original.fuelCapacity)}`;
  }

  return content;
}

export function textLable(lable, value, needsBr = true) {
  return `${needsBr ? '<br>' : ''}${lable}<span style="float:right">${value}</span>`;
}

export function dateToChronicleLable(inDate) {
  if (isNoIcons) {
    return `Time: <span style="float:right">${dateToChronicleStringTime(inDate)}</span>`;
  }
  return `${makeStaticLableSVG(deviceAccessTime)}<span style="float:right">${dateToChronicleStringTime(inDate)}</span>`;
}

export function msToDurtationLable(duration) {
  if (isNoIcons) {
    return `Duration: <span style="float:right">${msToTimeIntervalString(duration)}</span>`;
  }
  return `${makeStaticLableSVG(imageTimelapse)}<span style="float:right">${msToTimeIntervalString(duration)}</span>`;
}

export function metersToDistanceLable(meters) {
  // Math.round((meters/1000) * 10) / 10
  // Math.round((meters/100) ) / 10
  // meters to km, rounding to 1 dec point
  if (isNoIcons) {
    return `Dist: <span style="float:right">${metersToKmString(meters)}</span>`;
  }
  return `${makeStaticLableSVG(notificationTimeToLeave)}<span style="float:right">${metersToKmString(meters)}</span>`;
}

export function speedToChronicleLable(speed) {
  if (isNoIcons) {
    return `Speed: <span style="float:right">${speed.toFixed(1)} km/h</span>`;
  }
  return `${makeStaticLableSVG(notificationTimeToLeave)}<span style="float:right">${speed.toFixed(1)} km/h</span>`;
}

export function temperatureToChronicleLable(temp) {
  if (isNoIcons) {
    return `Temp: <span style="float:right">${temp.toFixed(1)} &deg;C</span>`;
  }
  return `${makeStaticLableSVG(placesAcUnit)}<span style="float:right">${temp.toFixed(1)} &deg;C</span>`;
}

function fuelToChronicleLable(fuelNormalized, fuelCapacity) {
  const fuelStr = fuelToString(fuelNormalized, fuelCapacity);
  if (isNoIcons) {
    return `Fuel: <span style="float:right">${fuelStr}</span>`;
  }
  return `${makeStaticLableSVG(localGasStation)}<span style="float:right">${fuelStr}</span>`;
}

function dateToChronicleStringTime(inDate) {
  return moment(inDate).format('HH:mm');
}

export function dateToChronicleString(inDate) {
  return moment(inDate).format('DD/MM/YY HH:mm');
}
