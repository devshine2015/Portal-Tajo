import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

const classes = StyleSheet.create({
  details: {
    padding: '0 56px',
    position: 'relative',
  },

  details__row: {
    display: 'flex',
    marginBottom: 10,
  },

  details__col: {
    marginRight: 10,
    width: '100%',
  },

  details__title: {
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.541176)',
    textTransform: 'capitalize',
  },

  details__button: {
    marginTop: 10,
  },

  verified: {
    color: theme.palette.primary4Color,
    fontWeight: 200,
    fontSize: 14,
    marginLeft: 10,
  },

  overlay: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    right: 0,
    bottom: -5,
  },

  overlay__inn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default classes;
