const formats = [{
  text: 'yyyy-mm-dd (Burmese)',
  value: 'yyyy-mm-dd',
}, {
  text: 'dd-mm-yyyy (Gregorian)',
  value: 'dd-mm-yyyy',
}];

export default {
  formats,
  defaultFormat: formats[0].value,
};
