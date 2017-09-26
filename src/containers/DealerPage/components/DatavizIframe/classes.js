import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  wrap: {},
  title: {
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.07)',
    padding: 20,
    fontFamily: '"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    fontSize: 26,
    '-webkit-font-smoothing': 'antialiased',
  },
  title_collapsible: {
    cursor: 'pointer',
  },
  body: {
    transition: 'all .3s',
    height: 200,
  },
  body_collapsed: {
    height: 0,
  },
});
