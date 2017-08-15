import { StyleSheet } from 'aphrodite/no-important';

const lightTeal = '#55ccc0';
const lightblue = '#4d92fb';

export default StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    background: `linear-gradient(60deg, ${lightTeal}, ${lightblue})`,
  },
});
