import { StyleSheet } from 'aphrodite/no-important';

const opacityKeyframes = {
  from: {
    opacity: 0,
  },

  to: {
    opacity: 1,
  },
};

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
    justifyContent: 'space-between',
    flexFlow: 'wrap column',
    height: '100%',
  },
  gridItem: {
    padding: 5,
    flex: '1 0 200px',
  },
});

export const summaryItemClasses = StyleSheet.create({
  item: {
    padding: 6,
    backgroundColor: '#fff',
    font: '200 condensed 10px "Helvetica Neue", Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    minWidth: 170,
    minHeight: 100,
  },
  head: {
    marginBottom: 3,
  },
  name: {
    fontSize: '220%',
    fontWeight: 400,
  },
  pos: {
    fontSize: '120%',
    color: '#787878',
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
    fontSize: '120%',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    color: '#494949',
    marginBottom: 2,
  },
  scores__val: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    fontSize: '220%',
    fontWeight: 400,
  },
  time: {
    fontSize: '100%',
    color: '#000',
  },
});
