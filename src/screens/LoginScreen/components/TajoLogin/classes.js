import { StyleSheet } from 'aphrodite/no-important';

const teal = '#55ccc0';
const lightTeal = '#52c7b8';

export default StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    background: `linear-gradient(60deg, ${teal}, ${lightTeal})`,
  },
});
