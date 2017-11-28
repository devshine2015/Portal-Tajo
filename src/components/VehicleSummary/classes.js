import { StyleSheet } from 'aphrodite/no-important';

// const DEFAULT_WIDGET_WIDTH = 600;

const classes = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingLeft: 0,
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
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
    color: '#999',
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
    color: '#999',
    fontWeight: 200,
    marginBottom: 10,
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
  },
});

export default classes;
