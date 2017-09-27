import { StyleSheet } from 'aphrodite/no-important';

export default StyleSheet.create({
  datavis_frame_wrap: {
    height: '100%',
  },
  datavis_frame_wrap_coll: {
    height: 'auto',
  },
  title: {
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.07)',
    padding: '10px 20px',
    fontFamily: '"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 300,
    fontSize: 22,
    '-webkit-font-smoothing': 'antialiased',
  },
  title_collapsible: {
    cursor: 'pointer',
  },
  body: {
    transition: 'all .3s',
  },
  body_collapsed: {
    height: 0,
  },
});
