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
  title: {
    fontSize: 18,
    color: '#999',
    fontWeight: 200,
    marginBottom: 10,
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title__right: {},
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  widgetPaper__inn: {
    display: 'flex',
    flex: 1,
    height: '100%',
  },
  widgetPaper: {
    width: '100%',
  },
});

export default classes;
