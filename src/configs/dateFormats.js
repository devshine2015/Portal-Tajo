const formats = [{
  type: 'Burmese',
  text: 'yyyy-mm-dd',
  value: 'yyyy-mm-dd',
}, {
  type: 'Gregorian',
  text: 'dd-mm-yyyy',
  value: 'dd-mm-yyyy',
}];

export const dateTypes = formats.map(f => f.value);

export default {
  formats,
  default: formats[0],
};
