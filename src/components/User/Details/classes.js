import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

const classes = StyleSheet.create({
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
});

export default classes;
