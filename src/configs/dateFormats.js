const formats = [{
  type: 'Burmese',
  text: 'yyyy-mm-dd',
  value: 'yyyy-mm-dd',
}, {
  type: 'Gregorian',
  text: 'dd-mm-yyyy',
  value: 'dd-mm-yyyy',
}];

export default {
  formats,
  default: formats[0],
};
