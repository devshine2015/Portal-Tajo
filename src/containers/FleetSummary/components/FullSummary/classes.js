import { StyleSheet } from 'aphrodite/no-important';
import theme from 'configs/theme';

const classes = StyleSheet.create({
  fullSummary: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  amount: {
    width: '49%',
    height: '49%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 190,
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
