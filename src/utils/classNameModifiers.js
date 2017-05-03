export default function getModifiers(className = '', styles = {}) {
  return className.split(' ').map(modifier => styles[modifier]);
};
