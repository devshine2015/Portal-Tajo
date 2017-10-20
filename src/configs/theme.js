// The most important text has an opacity of 87%.
// Secondary text, which is lower in the visual hierarchy, has an opacity of 54%.
// Text hints (like those in text fields and labels) and disabled text have even
// lower visual prominence with an opacity of 38%.

import tinycolor from 'tinycolor2';

import { white, blue600, cyan700,
  teal300, teal500, teal700, teal900,
  deepOrange700, yellow700,
} from 'material-ui/styles/colors';

export const tajoTheme = {
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: teal900,
    primary4Color: teal300,
    accent1Color: deepOrange700,
    accent2Color: yellow700,

    alertColor: yellow700, // blueGrey200
    dachboardElementColor: '#c4c3b1',    

    PLItemBackgroundColor: cyan700,
    PLItemBackgroundColorHover: tinycolor(cyan700).setAlpha(0.85).toRgbString(),
    PLItemColor: white,
    PLItemBackgroundColorExpanded: deepOrange700, // '#fd9e83',
    PLItemBackgroundColorExpandedHover: tinycolor(deepOrange700).setAlpha(0.85).toRgbString(),
    PLItemGFBackgroundColorExpanded: blue600,
    PLItemGFBackgroundColorExpandedHover: tinycolor(blue600).setAlpha(0.85).toRgbString(),
  },
  appBar: {
    logoutBackgroundColor: 'transparent',
    logoutTextColor: '#fff',
  },
  powerList: {
    backgroundColor: teal500,
    itemColor: cyan700,
    activeItemColor: deepOrange700,
    itemTextColor: '#fff',
  },
  layout: {
    headerColor: '#009688',
  },
  spacing: {
    appBarHeigth: 64,
    powerlistFilterHeight: 50,
  },
};

const ccMainBrandColor = '#00619E';

export const fusoTheme = {
  palette: {
    primary1Color: ccMainBrandColor, // '#e3142e',
    accent1Color: '#e3142e', // '#c4c3b1',

    alertColor: yellow700, //'#e64a19'
    dachboardElementColor: '#2196F3',
    
    PLItemBackgroundColor: cyan700,
    PLItemBackgroundColorHover: tinycolor(cyan700).setAlpha(0.85).toRgbString(),
    PLItemColor: white,
    PLItemBackgroundColorExpanded: deepOrange700, // '#fd9e83',
    PLItemBackgroundColorExpandedHover: tinycolor(deepOrange700).setAlpha(0.85).toRgbString(),
    PLItemGFBackgroundColorExpanded: blue600,
    PLItemGFBackgroundColorExpandedHover: tinycolor(blue600).setAlpha(0.85).toRgbString(),
  },
  appBar: {
    color: '#fff',
    textColor: ccMainBrandColor,
    logoutBackgroundColor: '#dee3ef',
    logoutTextColor: '#000',
    paddingRight: 16,
    borderColor: ccMainBrandColor,
  },
  powerList: {
    backgroundColor: '#c4c3b1',
    itemColor: '#dee3ef',
    activeItemColor: ccMainBrandColor,
    itemTextColor: '#000',
    activeItemTextColor: white,
  },
  layout: {
    headerColor: ccMainBrandColor,
  },
  spacing: tajoTheme.spacing,
};

// eslint-disable-next-line import/no-mutable-exports
// let theme;

/**
 * Singleton
 * Return theme based on runned project.
 * Idally must depend on theme
 * @param {String} project - running project
 * @returns {MaterialUITheme}
 */
// export function createTheme(project) {
//   switch (project) {
//     case 'dealer':
//       theme = getMuiTheme(fusoTheme);
//       break;
//     default:
//       theme = getMuiTheme(tajoTheme);
//       break;
//   }
// }

// export default theme;
