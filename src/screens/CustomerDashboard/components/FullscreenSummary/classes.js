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
    flexFlow: 'wrap column',
    height: '100%',
  },
  gridItem: {
    margin: 5,
    flex: 0,
    flexBasis: 130,
    backgroundColor: '#fff',
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
  item_white: {
    backgroundColor: '#fff',
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
    fontSize: 10,
    color: '#787878',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
  },
  time: {
    color: '#000',
  },
});
