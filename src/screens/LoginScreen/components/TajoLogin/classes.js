import { StyleSheet } from 'aphrodite/no-important';

const teal = '#55ccc0';
const lightTeal = '#5fe2d1';

export default StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    background: `linear-gradient(60deg, ${lightTeal}, ${teal})`,
  },
});
