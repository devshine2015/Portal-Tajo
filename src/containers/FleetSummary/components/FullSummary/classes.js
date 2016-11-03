import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

const classes = StyleSheet.create({
  fullSummary: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

    '@media (max-width: 600px)': {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexWrap: 'nowrap',
    },
  },

  amount: {
    width: '49%',
    minWidth: 190,
    height: '49%',
    minHeight: 100,
    maxHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 600px)': {
      width: '100%',
      marginBottom: 15,
    },
  },
  amount_fullwidth: {
    width: '100%',
  },
  amount__inn: {
    display: 'flex',
    alignItems: 'center',
    width: 170,
  },
  amount__icon: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  amount__col: {
    display: 'inline-flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  amount__title: {
    fontSize: 40,
    fontWeight: 100,
    color: theme.palette.primary3Color,
    lineHeight: '100%',
  },
  amount__help: {
    fontSize: 12,
    marginLeft: 2,
    color: '#aaa',
  },
});

export default classes;
