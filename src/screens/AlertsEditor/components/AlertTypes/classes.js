import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({

  alertItem: {
    marginBottom: '15px',
  },

  sectionContainer: {
    padding: '40px 60px 80px 60px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2);',
    backgroundColor: '#ddd',
    ':nth-child(odd)': {
      backgroundColor: '#f4f4f4',
    },
  },

  sectionBtnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  formWrapper: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '1px solid #ccc',
  },
  formWrapper__inn: {
    margin: '0 auto',
    paddingBottom: 12,
    width: 400,
  },
});

export default classes;
