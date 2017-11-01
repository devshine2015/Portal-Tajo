import { StyleSheet } from 'aphrodite/no-important';


// #E53935
// #e91e63
// #ff5722
const alertColorAnimation = {
  '0%': {
    backgroundColor: '#E53935',
  },
  '60%': {
    backgroundColor: '#E53935',
  },
  '100%': {
    backgroundColor: 'lightgray',
  },
};


const opacityKeyframes = {
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
};

export const fabClasses = StyleSheet.create({
  fab: {
    position: 'fixed',
  },
});

export const fullscreenContainerClasses = StyleSheet.create({
  fullscreenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
});

export const fullscreenSummaryClasses = StyleSheet.create({
  content: {
    padding: 20,
    width: '100%',
    height: '100%',
    animationName: opacityKeyframes,
    animationDuration: '3000ms',
    animationIterationCount: 1,
  },
});

export const summaryGridClasses = StyleSheet.create({
  grid: {
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'wrap row',
    alignContent: 'flex-start',
    backgroundColor: '#000',
    margin: '-20px',
  },
  gridItem: {
    margin: 5,
    flex: 0,
    maxWidth: 250,
    maxHeight: 150,
    flexBasis: 210,
    flexGrow: '2',
    backgroundColor: '#fff',
    borderRadius: '3px',
    overflow: 'hidden',
  },
});

export const summaryItemClasses = StyleSheet.create({
  item: {
    padding: 6,
    font: '200 condensed 10px "Helvetica Neue", Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    transition: 'background-color .25s ease-in',
    backgroundColor: 'rgba(0, 255, 0, .4)',
  },
  item_no_move: {
    backgroundColor: '#fff',
  },
  item_alerted: {
    backgroundColor: 'lightgray',
  },
  head: {
    marginBottom: 3,
    maxWidth: 170,
    whiteSpace: 'nowrap',
  },
  name: {
    fontSize: 17,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    lineHeight: '110%',
    marginBottom: 3,
  },
  pos: {
    fontSize: 12,
    color: '#787878',
    textDecoration: 'underline',

    ':hover': {
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
  pos_copied: {
    pointerEvent: 'none',
    textDecoration: 'none',
  },
  scores: {
    marginBottom: 3,
    display: 'flex',
    justifyContent: 'space-around',
  },
  scores__col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  scores__title: {
    fontSize: 12,
    whiteSpace: 'nowrap',
    display: 'inline-block',
    color: '#494949',
    marginBottom: 2,
  },
  scores__val: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    fontSize: 22,
    fontWeight: 400,
    padding: '0 4px',
    borderRadius: '3px',
  },
  scores__val_tempAlert: {
    color: 'white',
    animationName: alertColorAnimation,
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
  },
  time: {
    color: '#000',
  },
});
