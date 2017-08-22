import { StyleSheet } from 'aphrodite/no-important';

const DEFAULT_WIDGET_WIDTH = 600;

const classes = StyleSheet.create({
  widget: {
    display: 'flex',
    flexDirection: 'column',
    width: DEFAULT_WIDGET_WIDTH,
    marginBottom: 30,

    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  widget__title: {
    fontSize: 18,
    color: '#999',
    fontWeight: 200,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  widget__body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  widget__inn: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  widget__paper: {
    width: '100%',
  },
});

export default classes;
