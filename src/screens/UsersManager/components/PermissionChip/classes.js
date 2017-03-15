import { StyleSheet, css } from 'aphrodite/no-important';

export const rawClasses = StyleSheet.create({
  chip: {
    transition: 'background-color .3s',
  },

  chip__inside: {
    display: 'flex',
    padding: '0 14px',
    alignItems: 'center',
  },
});

export default {
  chip: css(rawClasses.chip),
  chipInside: css(rawClasses.chip__inside),
};
