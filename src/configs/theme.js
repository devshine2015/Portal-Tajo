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
  spacing: {
    appBarHeigth: 64,
    powerlistFilterHeight: 50,
  },
};

export const fusoTheme = {
  palette: {
    primary1Color: '#e3142e',
    accent1Color: '#c4c3b1',
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
    textColor: '#e3142e',
    logoutBackgroundColor: '#c4c3b1',
    logoutTextColor: '#000',
    paddingRight: 16,
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
