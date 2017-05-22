export default (a, b) => {
  return b.get('eventTS') - a.get('eventTS');
};
