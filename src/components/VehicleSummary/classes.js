import { StyleSheet } from 'aphrodite/no-important';
import tinycolor from 'tinycolor2';
import { theme } from 'configs';

// const DEFAULT_WIDGET_WIDTH = 600;
const fontColor = tinycolor(theme.palette.primary1Color).setAlpha(0.75).toString();
// color: '#999',

const classes = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingLeft: 0,
    fontSize: 24,
    fontWeight: 'bold',
    color: fontColor,
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
  },
  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    // flex: 1,
    justifyContent: 'center',
    width: '100%',
    color: fontColor,
  },
  itemBody: {
    display: 'flex',
    // flex: 1,
    justifyContent: 'space-between',
    margin: '0 12px',
  },
  itemTitle: {
    paddingRight: '8px',
    fontSize: 12,
    fontWeight: 200,
    marginBottom: 10,
    position: 'relative',
    top: '7px',
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
  },
  itemValue: {
    fontSize: 18,
    fontWeight: 200,
    marginBottom: 10,
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
  },
});

export default classes;
