import { StyleSheet } from 'aphrodite/no-important';
import { theme } from 'configs';

export const fabClasses = StyleSheet.create({
  fab: {
    position: 'fixed',
    top: '80px',
    right: '16px',
    zIndex: 25,
  },
});

export const summaryClasses = StyleSheet.create({
  fullSummary: {
    margin: '0 auto',
  },
  action: {
    fontSize: 13,
    fontStyle: 'italic',
    textDecoration: 'underline',
    transition: 'color .25s',
    textTransform: 'capitalize',

    ':hover': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#666',
    },

    ':focus': {
      outline: 'none',
    },
  },
});

export const amountClasses = StyleSheet.create({
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
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
