// the MUI default theme:
// {
//   spacing: spacing,
//   fontFamily: 'Roboto, sans-serif',
//   palette: {
//     primary1Color: cyan500,
//     primary2Color: cyan700,
//     primary3Color: grey400,
//     accent1Color: pinkA200,
//     accent2Color: grey100,
//     accent3Color: grey500,
//     textColor: darkBlack,
//     alternateTextColor: white,
//     canvasColor: white,
//     borderColor: grey300,
//     disabledColor: fade(darkBlack, 0.3),
//     pickerHeaderColor: cyan500,
//     clockCircleColor: fade(darkBlack, 0.07),
//     shadowColor: fullBlack,
//   },
// };

// For dark text on light backgrounds, apply the following opacity levels:
//
// The most important text has an opacity of 87%.
// Secondary text, which is lower in the visual hierarchy, has an opacity of 54%.
// Text hints (like those in text fields and labels) and disabled text have even
// lower visual prominence with an opacity of 38%.

import tinycolor from 'tinycolor2';

import { white, darkBlack,
  indigo500, indigo300,
  blue600,
  lightBlue800,
  cyan500, cyan600, cyan700, cyan800, cyan900,
  teal500, teal700, teal900,
  blueGrey500,
  deepOrange700, deepOrange800, deepOrange900,
  yellow700,
  brown500,
  lime500, lime300,
  green500, green700,
  lightGreenA400, lightGreenA700,
 } from 'material-ui/styles/colors';

const drvrDevTheme = {
  palette: {
    primary1Color: teal500, // '#FFB300'
    primary2Color: teal700,
    primary3Color: teal900,
    accent1Color: deepOrange700,
    accent2Color: yellow700,
    // accent3Color: grey500,
    PLItemBackgroundColor: cyan700,
    PLItemBackgroundColorHover: tinycolor(cyan700).setAlpha(0.85).toRgbString(),
    // PLItemBackgroundColor: '#D0C590',  //Yuma
    // PLItemBackgroundColorHover: tinycolor('#D0C590').setAlpha(0.85).toRgbString(),

    PLItemColor: white,
//    PLItemColor: tinycolor(darkBlack).setAlpha(0.87).toRgbString(),
    PLItemBackgroundColorExpanded: deepOrange700, // '#fd9e83',
    PLItemBackgroundColorExpandedHover: tinycolor(deepOrange700).setAlpha(0.85).toRgbString(),

    PLItemGFBackgroundColorExpanded: blue600,
    PLItemGFBackgroundColorExpandedHover: tinycolor(blue600).setAlpha(0.85).toRgbString(),


//    PLItemBackgroundColorExpanded: cyan500,
//    PLItemBackgroundColorExpandedHover: tinycolor(cyan500).setAlpha(0.85).toRgbString(),
  },
};

export default drvrDevTheme;

export const dimensions = {
  appBarHeigth: 64,
  powerlistFilterHeight: 50,
};
