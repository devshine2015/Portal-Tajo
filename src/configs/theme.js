// The most important text has an opacity of 87%.
// Secondary text, which is lower in the visual hierarchy, has an opacity of 54%.
// Text hints (like those in text fields and labels) and disabled text have even
// lower visual prominence with an opacity of 38%.

import tinycolor from 'tinycolor2';

import { white, blue600, cyan700,
  teal300, teal500, teal700, teal900,
  deepOrange700, yellow700,
  blueGrey200,
  green600,
} from 'material-ui/styles/colors';

export const tajoTheme = {
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: teal900,
    primary4Color: teal300,
    accent1Color: deepOrange700,
    accent2Color: yellow700,

    okColor: green600,
    warningColor: blueGrey200,
    alertColor: yellow700, // blueGrey200
    dachboardElementColor: '#c4c3b1',

    PLItemBackgroundColor: cyan700,
    PLItemBackgroundColorHover: tinycolor(cyan700).setAlpha(0.85).toString(),
    PLItemColor: white,
    PLItemBackgroundColorExpanded: deepOrange700, // '#fd9e83',
    PLItemBackgroundColorExpandedHover: tinycolor(deepOrange700).setAlpha(0.85).toString(),
    PLItemGFBackgroundColorExpanded: blue600,
    PLItemGFBackgroundColorExpandedHover: tinycolor(blue600).setAlpha(0.85).toString(),
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
    sectionColor1: '#ddd',
    sectionColor2: '#f4f4f4',
  },
  spacing: {
    appBarHeigth: 64,
    powerlistFilterHeight: 50,
  },
  mainMenuItemColors: [
    '#3F51B5',
    '#1976D2',
    '#009688',
    '#2E7D32',
    '#FFA000',
    '#FF5722',
    '#795548',
    '#607D8B',
    '#3F51B5',
    '#1976D2',
    '#009688',
    '#2E7D32',
    '#FFA000',
    '#FF5722',
    '#795548',
    '#607D8B',
  ],
};

const ccMainBrandColor = '#00619E';

export const ccTheme = {
  palette: {
    primary1Color: ccMainBrandColor, // '#e3142e',
    accent1Color: '#e3142e', // '#c4c3b1',

    okColor: '#61a653',
    warningColor: yellow700,
    alertColor: tinycolor('rgb 234 34 36').toString(),
    dachboardElementSecondaryColor: tinycolor('rgb 190 190 190').toString(),
    dachboardElementColor: ccMainBrandColor, // '#2196F3',

    PLItemBackgroundColor: cyan700,
    PLItemBackgroundColorHover: tinycolor(cyan700).setAlpha(0.85).toString(),
    PLItemColor: white,
    PLItemBackgroundColorExpanded: deepOrange700, // '#fd9e83',
    PLItemBackgroundColorExpandedHover: tinycolor(deepOrange700).setAlpha(0.85).toString(),
    PLItemGFBackgroundColorExpanded: blue600,
    PLItemGFBackgroundColorExpandedHover: tinycolor(blue600).setAlpha(0.85).toString(),
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
    // backgroundColor: '#c4c3b1',
    // itemColor: '#dee3ef',
    backgroundColor: '#dee3f0',
    itemColor: '#fff',
    activeItemColor: ccMainBrandColor,
    itemTextColor: '#000',
    activeItemTextColor: white,
  },
  layout: {
    headerColor: ccMainBrandColor,
    sectionColor1: 'white',
    sectionColor2: 'white',
  },
  spacing: tajoTheme.spacing,
  mainMenuItem: {
    height: '80px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: ccMainBrandColor, // '#222',
  },
  mainMenuItemSelected: {
    backgroundColor: ccMainBrandColor,
    color: '#fff',
    borderTopLeftRadius: '40px',
    borderBottomLeftRadius: '40px',
    boxShadow: '0px 2px 7px 1px rgba(0, 0, 0, .5)',
    zIndex: 1,
  },
};

const sccMainBrandColor = '#ec1c24';
export const sccTheme = {
  palette: {
    primary1Color: sccMainBrandColor,
    accent1Color: '#c4c3b1',

    okColor: '#61a653',
    warningColor: yellow700,
    alertColor: tinycolor('rgb 234 34 36').toString(),
    dachboardElementSecondaryColor: tinycolor('rgb 190 190 190').toString(),
    dachboardElementColor: sccMainBrandColor, // '#2196F3',

    PLItemBackgroundColor: cyan700,
    PLItemBackgroundColorHover: tinycolor(cyan700).setAlpha(0.85).toString(),
    PLItemColor: white,
    PLItemBackgroundColorExpanded: deepOrange700, // '#fd9e83',
    PLItemBackgroundColorExpandedHover: tinycolor(deepOrange700).setAlpha(0.85).toString(),
    PLItemGFBackgroundColorExpanded: blue600,
    PLItemGFBackgroundColorExpandedHover: tinycolor(blue600).setAlpha(0.85).toString(),
  },
  appBar: {
    color: '#fff',
    textColor: sccMainBrandColor,
    logoutBackgroundColor: '#dee3ef',
    logoutTextColor: '#000',
    paddingRight: 16,
    borderColor: sccMainBrandColor,
  },
  powerList: {
    // backgroundColor: '#c4c3b1',
    // itemColor: '#dee3ef',
    backgroundColor: '#dee3f0',
    itemColor: '#fff',
    activeItemColor: sccMainBrandColor,
    itemTextColor: '#000',
    activeItemTextColor: white,
  },
  layout: {
    headerColor: sccMainBrandColor,
    sectionColor1: 'white',
    sectionColor2: 'white',
  },
  spacing: tajoTheme.spacing,
  mainMenuItem: {
    height: '80px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: sccMainBrandColor, // '#222',
  },
  mainMenuItemSelected: {
    backgroundColor: sccMainBrandColor,
    color: '#fff',
    borderTopLeftRadius: '40px',
    borderBottomLeftRadius: '40px',
    boxShadow: '0px 2px 7px 1px rgba(0, 0, 0, .5)',
    zIndex: 1,
  },
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
