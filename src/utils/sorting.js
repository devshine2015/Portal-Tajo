export function sortByName(a = {}, b = {}) {
  const nameA = a.name.trim();
  const nameB = b.name.trim();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
}
