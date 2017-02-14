const formats = [{
  type: 'Burmese',
  text: 'yyyy-mm-dd (Burmese)',
  value: 'yyyy-mm-dd',
}, {
  type: 'Gregorian',
  text: 'dd-mm-yyyy (Gregorian)',
  value: 'dd-mm-yyyy',
}];

export default {
  formats,
  default: formats[0],
};
