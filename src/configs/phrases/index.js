import behasa from './behasa';
import english from './english';
import simplified from './chinese_simplified';
import traditional from './chinese_traditional';
import thai from './thai';

export default {
  en: english,
  th: thai,
  id: behasa,
  cn: simplified,
  tw: traditional,
};

export const locales = [{
  text: 'en',
  value: 'en',
}, {
  text: 'th',
  value: 'th',
}, {
  text: 'id',
  value: 'id',
}, {
  text: '简体',
  value: 'cn', // simplified
}, {
  text: '繁體',
  value: 'tw', // traditional
}];
