
export default function addCSSRule(selector, rules, index) {
  const sheet = document.styleSheets[0];
  if (sheet.insertRule) sheet.insertRule(selector + '{' + rules + '}', index);
  else sheet.addRule(selector, rules, index);
}
