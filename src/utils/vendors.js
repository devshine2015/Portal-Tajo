function makePrefixedArray(prefix, propName) {
  const fs = [propName];

  if (!prefix) return fs;

  const firstLetter = propName.charAt(0);
  const withPrefix = prefix.lowercase.concat(propName.replace(firstLetter, firstLetter.toUpperCase()));

  fs.push(withPrefix);

  return fs;
}

/**
 * 
 * @param {Object} element = object you want to find prefixed propName in
 * @param {Object|Boolean} prefix - hold prefix strings, or false
 * @param {String} propName - function to be prefixed
 * 
 * @returns {String} name of the propert
 */
export default function (element, prefix, propName) {
  const arr = makePrefixedArray(prefix, propName)
    .filter(prop => element[prop] !== undefined);

  return arr.length !== 0 ? arr[0] : undefined;
}
