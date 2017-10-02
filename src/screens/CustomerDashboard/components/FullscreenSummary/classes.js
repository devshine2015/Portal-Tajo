import { StyleSheet } from 'aphrodite/no-important';

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
  },
});

export const summaryGridClasses = StyleSheet.create({
  grid: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  gridItem: {
    minWidth: 171,
    minHeight: 100,
    padding: 5,
    flex: 1,
  },
});

export const summaryItemClasses = StyleSheet.create({
  item: {
    padding: 6,
    backgroundColor: '#fff',
    font: '200 condensed 14px "Helvetica Neue", Arial, sans-serif',
    lineHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    minWidth: 170,
    minHeight: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 3,
  },
  pos: {
    fontSize: 12,
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
    font: '200 condensed 12px "Helvetica Neue", Arial, sans-serif',
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
    lineHeight: '110%',
  },
  time: {
    fontSize: 10,
    color: '#000',
  },
});
