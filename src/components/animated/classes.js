import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

const classes = StyleSheet.create({
  logo: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo_fullscreen: {
    position: 'absolute',
    top: theme.spacing.appBarHeigth,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  logo_centered: {
    flex: 1,
  },
  text: {
    marginLeft: 5,
  },
});

export default classes;
